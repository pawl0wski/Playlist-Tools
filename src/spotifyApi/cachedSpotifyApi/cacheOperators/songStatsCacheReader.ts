import { SongStats } from "../../interfaces/songstats";
import { CacheReader } from "./abstracts/cacheReader";

export class SongStatsCacheReader extends CacheReader {
    protected mapSerializeObjectToObject(object: {
        [key: string]: string;
    }): SongStats {
        return {
            id: object["id"],
            acousticness: parseInt(object["acousticness"]),
            danceability: parseInt(object["danceability"]),
            energy: parseInt(object["energy"]),
            instrumentalness: parseInt(object["instrumentalness"]),
            liveness: parseInt(object["liveness"]),
            loudness: parseInt(object["loudness"]),
            speechiness: parseInt(object["speechiness"]),
            tempo: parseInt(object["tempo"]),
            valence: parseInt(object["valence"]),
        };
    }
}
