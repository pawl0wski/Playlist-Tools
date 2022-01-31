import { Author } from "../../interfaces/author";
import { CacheUpdater } from "./abstracts/cacheUpdater";

export class AuthorCacheUpdater extends CacheUpdater {
    protected mapObjectToSerializeObject(item: Author): {
        [key: string]: string;
    } {
        return {
            id: item.id,
            name: item.name,
            genres: item.genres.join(","),
            followers: item.followers.toString(),
            popularity: item.popularity.toString(),
        };
    }
}
