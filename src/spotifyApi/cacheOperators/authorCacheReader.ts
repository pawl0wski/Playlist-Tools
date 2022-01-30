import { Author } from "../interfaces/author";
import { CacheReader } from "./abstracts/cacheReader";

export class AuthorCacheReader extends CacheReader {
    protected mapSerializeObjectToObject(object: {
        [key: string]: string;
    }): Author {
        return {
            id: object["id"],
            name: object["name"],
            genres: object["genres"].split(","),
            followers: parseInt(object["followers"]),
            popularity: parseFloat(object["popularity"]),
        };
    }
}
