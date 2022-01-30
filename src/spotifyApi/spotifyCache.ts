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

    constructor() {
        const songKey = "songsCache";
        const songStatsKey = "songsStatsCache";
        const authorStatsKey = "authorStatsKey";

        this.songReader = new SongCacheReader(songKey);
        this.songUpdater = new SongCacheUpdater(songKey);
        this.songStatsReader = new SongStatsCacheReader(songStatsKey);
        this.songStatsUpdate = new SongStatsCacheUpdater(songStatsKey);
        this.authorReader = new AuthorCacheReader(authorStatsKey);
        this.authorUpdater = new AuthorCacheUpdater(authorStatsKey);
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
}
