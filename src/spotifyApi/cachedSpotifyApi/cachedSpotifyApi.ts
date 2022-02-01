import { Song } from "../interfaces/song";
import { SongStats } from "../interfaces/songstats";
import { SpotifyApi } from "../spotifyApi";
import { SpotifyCache } from "./spotifyCache";

export class CachedSpotifyApi extends SpotifyApi {
    protected static instance: CachedSpotifyApi | undefined;
    private spotifyCache: SpotifyCache;

    constructor(clientId: string, callbackUrl: string, scope: string) {
        super(clientId, callbackUrl, scope);
        this.spotifyCache = new SpotifyCache();
    }

    public static getInstance(
        clientId: string,
        callbackUrl: string,
        scope: string
    ) {
        if (!CachedSpotifyApi.instance) {
            CachedSpotifyApi.instance = new CachedSpotifyApi(
                clientId,
                callbackUrl,
                scope
            );
        }
        return CachedSpotifyApi.instance;
    }

    public logOut() {
        this.spotifyCache.deleteUserCache();
        super.logOut();
    }

    async getUsername(): Promise<string> {
        let cachedUsername = this.spotifyCache.getUsernameFromCache();
        if (!cachedUsername) {
            let usernameFromApi = await super.getUsername();
            this.spotifyCache.addUsernameToCache(usernameFromApi);
            return usernameFromApi;
        } else {
            return cachedUsername;
        }
    }

    async getMeId(): Promise<string> {
        let cachedMeId = this.spotifyCache.getMeIdFromCache();
        if (!cachedMeId) {
            let meIdFromApi = await super.getMeId();
            this.spotifyCache.addMeIdToCache(meIdFromApi);
            return meIdFromApi;
        } else {
            return cachedMeId;
        }
    }

    async getAvatarUrl(): Promise<string> {
        let cachedAvatarUrl = this.spotifyCache.getAvatarUrlFromCache();
        if (!cachedAvatarUrl) {
            let avatarUrlFromApi = await super.getAvatarUrl();
            this.spotifyCache.addAvatarUrlToCache(avatarUrlFromApi);
            return avatarUrlFromApi;
        } else {
            return cachedAvatarUrl;
        }
    }

    async attachSongStatsToSongs(songs: Array<Song>): Promise<Array<Song>> {
        songs.forEach((e: Song) => {
            let cachedSongStats = this.spotifyCache.getSongStatsFromCache(e.id);
            if (cachedSongStats) {
                e.songStats = cachedSongStats;
            }
        });

        let songsWithoutCachesSongStats = songs.filter((e: Song) => {
            return !e.songStats;
        });

        await super.attachSongStatsToSongs(songsWithoutCachesSongStats);

        songsWithoutCachesSongStats.forEach((song: Song) => {
            this.spotifyCache.addSongStatsToCache(song.songStats!);
        });

        return songs;
    }

    async attachAuthorToSongsWithProvidedAuthorsId(
        songs: Array<Song>,
        authorIds: Array<string>
    ): Promise<Array<Song>> {
        songs.forEach((e: Song, i: number) => {
            let cachedAuthor = this.spotifyCache.getAuthorFromCache(
                authorIds[i]
            );
            if (cachedAuthor) {
                e.author = cachedAuthor;
                delete authorIds[i];
            }
        });

        authorIds = authorIds.filter((aId: string) => {
            return !!aId;
        });

        let songsWithoutCachedAuthors = songs.filter((e: Song) => {
            if (!e.author) {
                return true;
            }
        });

        await super.attachAuthorToSongsWithProvidedAuthorsId(
            songsWithoutCachedAuthors,
            authorIds
        );

        songsWithoutCachedAuthors.forEach((e: Song) => {
            this.spotifyCache.addAuthorToCache(e.author!);
        });

        return songs;
    }
}
