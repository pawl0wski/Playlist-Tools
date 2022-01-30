import axios from "axios";
import { SpotifyCache } from "./spotifyCache";
import { SpotifyAuthentication } from "./spotifyAuthentication";
import { Playlist } from "./interfaces/playlist";
import { Song } from "./interfaces/song";

export class SpotifyApi {
    private static instance: SpotifyApi | undefined;
    private spotifyAuthentication: SpotifyAuthentication;
    private spotifyCache: SpotifyCache;

    private constructor(clientId: string, callbackUrl: string, scope: string) {
        this.spotifyAuthentication = new SpotifyAuthentication(
            clientId,
            callbackUrl,
            scope
        );
        this.spotifyCache = new SpotifyCache();
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

    private getAuthenticationHeader(authenticationToken: string): {
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

    // TODO: Implement
    public getSongsFromPlaylist(playlistId: string) {}

    // TODO: Implement
    public attachSongStatsToSong(songs: Array<Song>): Array<Song> | void {}
}
