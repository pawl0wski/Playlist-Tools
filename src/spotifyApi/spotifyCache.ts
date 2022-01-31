import { AuthorCacheReader } from "./cacheOperators/authorCacheReader";
import { AuthorCacheUpdater } from "./cacheOperators/authorCacheUpdater";
import { SongCacheReader } from "./cacheOperators/songCacheReader";
import { SongCacheUpdater } from "./cacheOperators/songCacheUpdater";
import { SongStatsCacheReader } from "./cacheOperators/songStatsCacheReader";
import { SongStatsCacheUpdater } from "./cacheOperators/songStatsCacheUpdater";
import { Author } from "./interfaces/author";
import { Song } from "./interfaces/song";
import { SongStats } from "./interfaces/songstats";

export class SpotifyCache {
    private songReader: SongCacheReader;
    private songUpdater: SongCacheUpdater;
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

        this.songReader = new SongCacheReader(this.songKey);
        this.songUpdater = new SongCacheUpdater(this.songKey);
        this.songStatsReader = new SongStatsCacheReader(this.songStatsKey);
        this.songStatsUpdate = new SongStatsCacheUpdater(this.songStatsKey);
        this.authorReader = new AuthorCacheReader(this.authorStatsKey);
        this.authorUpdater = new AuthorCacheUpdater(this.authorStatsKey);
    }

    getSongFromCache(id: string): Song | void {
        return this.songReader.read(id);
    }

    addSongToCache(song: Song) {
        return this.songUpdater.update(song);
    }

    getSongStatsFromCache(id: string): SongStats | void {
        return this.songStatsReader.read(id);
    }

    addSongStatsToCache(songStats: SongStats) {
        return this.songStatsUpdate.update(songStats);
    }

    getAuthorFromCache(id: string): Author | void {
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
}
