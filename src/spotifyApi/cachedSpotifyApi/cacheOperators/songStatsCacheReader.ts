import { SongStats } from "../../interfaces/songstats";
import { CacheReader } from "./abstracts/cacheReader";

export class SongStatsCacheReader extends CacheReader {
    protected mapSerializeObjectToObject(object: {
        [key: string]: string;
    }): SongStats {
        return {
            id: object["id"],
            acousticness: parseFloat(object["acousticness"]),
            danceability: parseFloat(object["danceability"]),
            energy: parseFloat(object["energy"]),
            instrumentalness: parseFloat(object["instrumentalness"]),
            liveness: parseFloat(object["liveness"]),
            loudness: parseFloat(object["loudness"]),
            speechiness: parseFloat(object["speechiness"]),
            tempo: parseFloat(object["tempo"]),
            valence: parseFloat(object["valence"]),
        };
    }
}
