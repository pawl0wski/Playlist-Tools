import { AuthorCacheReader } from "./cacheOperators/authorCacheReader";
import { AuthorCacheUpdater } from "./cacheOperators/authorCacheUpdater";
import { SongStatsCacheReader } from "./cacheOperators/songStatsCacheReader";
import { SongStatsCacheUpdater } from "./cacheOperators/songStatsCacheUpdater";
import { Author } from "../interfaces/author";
import { Song } from "../interfaces/song";
import { SongStats } from "../interfaces/songstats";

export class SpotifyCache {
    private songStatsReader: SongStatsCacheReader;
    private songStatsUpdate: SongStatsCacheUpdater;
    private authorUpdater: AuthorCacheUpdater;
    private authorReader: AuthorCacheReader;

    private songKey: string;
    private songStatsKey: string;
    private authorStatsKey: string;
    private usernameKey: string;
    private avatarUrlKey: string;

    constructor() {
        this.songKey = "songsCache";
        this.songStatsKey = "songsStatsCache";
        this.authorStatsKey = "authorStatsKey";
        this.usernameKey = "avatarUrlCache";
        this.avatarUrlKey = "usernameCache";
        this.songStatsReader = new SongStatsCacheReader(this.songStatsKey);
        this.songStatsUpdate = new SongStatsCacheUpdater(this.songStatsKey);
        this.authorReader = new AuthorCacheReader(this.authorStatsKey);
        this.authorUpdater = new AuthorCacheUpdater(this.authorStatsKey);
    }

    getSongStatsFromCache(id: string): SongStats | null {
        return this.songStatsReader.read(id);
    }

    addSongStatsToCache(songStats: SongStats) {
        return this.songStatsUpdate.update(songStats);
    }

    getAuthorFromCache(id: string): Author | null {
        return this.authorReader.read(id);
    }

    addAuthorToCache(author: Author) {
        return this.authorUpdater.update(author);
    }

    addUsernameToCache(username: string): string {
        localStorage.setItem(this.usernameKey, username);
        return username;
    }

    getUsernameFromCache(): string | null {
        return localStorage.getItem(this.usernameKey);
    }

    addAvatarUrlToCache(avatarUrl: string): string {
        localStorage.setItem(this.avatarUrlKey, avatarUrl);
        return avatarUrl;
    }

    getAvatarUrlFromCache(): string | null {
        return localStorage.getItem(this.avatarUrlKey);
    }

    deleteUserCache() {
        localStorage.removeItem(this.usernameKey);
        localStorage.removeItem(this.avatarUrlKey);
    }
}
