import { SongStats } from "../../interfaces/songstats";
import { CacheUpdater } from "./abstracts/cacheUpdater";

export class SongStatsCacheUpdater extends CacheUpdater {
    protected mapObjectToSerializeObject(item: SongStats): {
        [key: string]: string;
    } {
        return {
            acousticness: item.acousticness.toString(),
            danceability: item.danceability.toString(),
            energy: item.energy.toString(),
            instrumentalness: item.instrumentalness.toString(),
            liveness: item.liveness.toString(),
            loudness: item.loudness.toString(),
            speechiness: item.speechiness.toString(),
            tempo: item.tempo.toString(),
            valence: item.valence.toString(),
        };
    }
}
