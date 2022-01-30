import { Song } from "../interfaces/song";
import { CacheReader } from "./abstracts/cacheReader";

export class SongCacheReader extends CacheReader {
    protected mapSerializeObjectToObject(object: {
        [key: string]: string;
    }): Song {
        return {
            id: object["id"],
            author: undefined,
            songName: object["songName"],
            releaseDate: new Date(object["releaseDate"]),
            duration: parseInt(object["duration"]),
            songStats: undefined,
        };
    }
}
