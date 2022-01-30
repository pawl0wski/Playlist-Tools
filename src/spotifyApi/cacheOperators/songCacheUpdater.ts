import { Song } from "../interfaces/song";
import { CacheUpdater } from "./abstracts/cacheUpdater";

export class SongCacheUpdater extends CacheUpdater {
    protected mapObjectToSerializeObject(item: Song): {
        [key: string]: string;
    } {
        return {
            id: item.id,
            songName: item.songName,
            duration: item.duration.toString(),
            releaseDate: item.releaseDate.getTime().toString(),
        };
    }
}
