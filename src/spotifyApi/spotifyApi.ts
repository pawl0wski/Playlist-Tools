import axios from "axios";
import { SpotifyAuthentication } from "./spotifyAuthentication";
import { Playlist } from "./interfaces/playlist";
import { Song } from "./interfaces/song";
import { SongStatsCacheReader } from "./cachedSpotifyApi/cacheOperators/songStatsCacheReader";

export class SpotifyApi {
    protected static instance: SpotifyApi | undefined;
    protected spotifyAuthentication: SpotifyAuthentication;

    protected constructor(
        clientId: string,
        callbackUrl: string,
        scope: string
    ) {
        this.spotifyAuthentication = new SpotifyAuthentication(
            clientId,
            callbackUrl,
            scope
        );
    }

    // SpotifyApi is Singleton so you need to obtain SpotifyApi object using this method
    public static getInstance(
        clientId: string,
        callbackUrl: string,
        scope: string
    ) {
        if (!SpotifyApi.instance) {
            SpotifyApi.instance = new SpotifyApi(clientId, callbackUrl, scope);
        }
        return SpotifyApi.instance;
    }

    public logOut() {
        this.spotifyAuthentication.logOut();
    }

    public isAuthorized(): boolean {
        return this.spotifyAuthentication.isAuthorized();
    }

    public logIn() {
        this.spotifyAuthentication.getTokenOrRenew();
    }

    public setAuthorizationToken(
        authorizationToken: string,
        expiresIn: number
    ): void {
        this.spotifyAuthentication.setAuthInfoAndSaveInLocalStorage(
            authorizationToken,
            expiresIn
        );
    }

    protected getAuthenticationHeader(authenticationToken: string): {
        Authorization: string;
    } {
        return {
            Authorization: `Bearer ${authenticationToken}`,
        };
    }

    public async getUsername(): Promise<string> {
        let token = this.spotifyAuthentication.getTokenOrRenew()!;

        let data = (
            await axios.get("https://api.spotify.com/v1/me", {
                headers: this.getAuthenticationHeader(token),
            })
        ).data;

        return data["display_name"];
    }

    public async getAvatarUrl(): Promise<string> {
        let token = this.spotifyAuthentication.getTokenOrRenew()!;

        let data = (
            await axios.get("https://api.spotify.com/v1/me", {
                headers: this.getAuthenticationHeader(token),
            })
        ).data;

        return data["images"][0]["url"];
    }

    public async getMyPlaylists(
        onlyCreatedByMe: boolean
    ): Promise<Array<Playlist>> {
        let token = this.spotifyAuthentication.getTokenOrRenew()!;

        // Make function for getting playlists recursive by pages
        let getAllPlaylistsByRecursion = async (
            nextPage: string,
            authorizationHeader: { Authorization: string }
        ): Promise<any[]> => {
            // Get playlists
            let data = (
                await axios.get(nextPage, {
                    headers: authorizationHeader,
                })
            ).data;
            let playlists;
            // If is another page available
            if (data.next) {
                playlists = [
                    ...data.items,
                    ...(await getAllPlaylistsByRecursion(
                        data.next,
                        authorizationHeader
                    )),
                ];
            } else {
                playlists = data.items;
            }
            return playlists;
        };

        let playlistsData = (
            await axios.get(
                `https://api.spotify.com/v1/me/playlists?limit=50`,
                {
                    headers: this.getAuthenticationHeader(token),
                }
            )
        ).data;

        let playlists = [];

        if (playlistsData["next"]) {
            playlists = [
                ...playlistsData["items"],
                ...(await getAllPlaylistsByRecursion(
                    playlistsData["next"],
                    this.getAuthenticationHeader(token)
                )),
            ];
        } else {
            playlists = playlistsData["items"];
        }

        // If onlyCreatedByMe is set filter playlists
        let username = await this.getUsername();
        playlists = playlists.filter(
            (playlistsData: { [key: string]: any }) => {
                return playlistsData["owner"]["display_name"] == username;
            }
        );

        // Change structure for interface
        playlists = playlists.map((playlistData: { [key: string]: any }) => {
            return {
                id: playlistData["id"],
                name: playlistData["name"],
                description: playlistData["description"],
                imageUrl: playlistData["images"][0]["url"],
            };
        });
        return playlists;
    }

    public async getSongsFromPlaylist(
        playlistId: string
    ): Promise<Array<Song>> {
        let authToken = this.spotifyAuthentication.getTokenOrRenew()!;
        let authorizationHeader = this.getAuthenticationHeader(authToken);
        let songsData = (
            await axios.get(
                `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                {
                    headers: authorizationHeader,
                }
            )
        ).data;

        let getAllSongsByRecursion = async (
            nextSongsPage: string | null,
            authorizationHeader: { Authorization: string }
        ): Promise<Array<Song>> => {
            if (nextSongsPage) {
                let songsData = (
                    await axios.get(nextSongsPage, {
                        headers: authorizationHeader,
                    })
                ).data;
                return [
                    ...songsData["items"],
                    ...(await getAllSongsByRecursion(
                        songsData["next"],
                        authorizationHeader
                    )),
                ];
            } else {
                return [];
            }
        };

        let songsDataInPlaylist = [
            ...songsData["items"],
            ...(await getAllSongsByRecursion(
                songsData["next"],
                authorizationHeader
            )),
        ];

        // Filter Array because some songs are null. Spotify api have bug or something.
        songsDataInPlaylist = songsDataInPlaylist.filter((song) => {
            return !!song["track"];
        });

        // Remove local songs
        songsDataInPlaylist = songsDataInPlaylist.filter((song) => {
            return !song["track"]["is_local"];
        });

        let authorsId = songsDataInPlaylist.map((serializedSong) => {
            return serializedSong["track"]["artists"][0]["id"];
        });

        // Change serialized data to objects of Song
        let songs: Array<Song> = songsDataInPlaylist.map((serializedSong) => {
            serializedSong = serializedSong["track"];
            return {
                id: serializedSong["id"],
                songName: serializedSong["name"],
                releaseDate: new Date(serializedSong["release_date"]),
                duration: serializedSong["duration"],
                explicit: serializedSong["explicit"],
                isLocal: serializedSong["is_local"],
                markets: serializedSong["available_markets"],
                author: undefined,
                songStats: undefined,
            };
        });

        songs = await this.attachSongStatsToSongs(songs);
        songs = await this.attachAuthorToSongsWithProvidedAuthorsId(
            songs,
            authorsId
        );
        return songs;
    }

    private async attachSongStatsToSongs(
        songs: Array<Song>
    ): Promise<Array<Song>> {
        let i,
            j,
            songsChunk: Array<Song>,
            chunk = 100;
        for (i = 0, j = songs.length; i < j; i += chunk) {
            songsChunk = songs.slice(i, i + chunk);
            let authToken = this.spotifyAuthentication.getTokenOrRenew()!;
            let authenticationHeader = this.getAuthenticationHeader(authToken);
            let songsIds: Array<string> = songsChunk.map((song: Song) => {
                return song.id;
            });
            let songsStatsData = (
                await axios.get(
                    `https://api.spotify.com/v1/audio-features?ids=${songsIds.join(
                        ","
                    )}`,
                    {
                        headers: authenticationHeader,
                    }
                )
            ).data;
            songsStatsData = songsStatsData["audio_features"];
            songsStatsData.forEach((songStat: any, i: number) => {
                if (!!songStat) {
                    songsChunk[i].songStats = {
                        acousticness: songStat["acousticness"],
                        danceability: songStat["danceability"],
                        energy: songStat["energy"],
                        instrumentalness: songStat["instrumentalness"],
                        liveness: songStat["liveness"],
                        loudness: songStat["loudness"],
                        speechiness: songStat["speechiness"],
                        tempo: songStat["tempo"],
                        valence: songStat["valence"],
                    };
                }
            });
        }
        return songs;
    }

    private async attachAuthorToSongsWithProvidedAuthorsId(
        songs: Array<Song>,
        authorsId: Array<string>
    ) {
        if (songs.length != authorsId.length) {
            throw new Error("Songs length don't equal authorsId length");
        } else {
            let i,
                j,
                authorsChunk: Array<string>,
                songsChunk: Array<Song>,
                chunk = 50;
            for (i = 0, j = songs.length; i < j; i += chunk) {
                authorsChunk = authorsId.slice(i, i + chunk);
                songsChunk = songs.slice(i, i + chunk);
                let authToken = this.spotifyAuthentication.getTokenOrRenew()!;
                let authorizationHeader =
                    this.getAuthenticationHeader(authToken);
                let authorsData = (
                    await axios.get(
                        `https://api.spotify.com/v1/artists?ids=${authorsChunk.join(
                            ","
                        )}`,
                        { headers: authorizationHeader }
                    )
                ).data["artists"];
                authorsData.forEach((authorData: any, i: number) => {
                    songsChunk[i].author = {
                        id: authorData["id"],
                        name: authorData["name"],
                        genres: authorData["genres"],
                        followers: authorData["followers"],
                        popularity: authorData["popularity"],
                    };
                });
            }
            return songs;
        }
    }
}
