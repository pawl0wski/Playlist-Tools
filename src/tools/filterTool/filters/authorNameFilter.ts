import { Song } from "@/spotifyApi/interfaces/song";
import { InputTextFilter } from "../filter";

export class AuthorNameFilter extends InputTextFilter {
    static filterName = "Author name filter";
    static filterDesc = "Remove songs by author name";
    static filterIcon = "fas fa-user";

    getValueToComparison(song: Song): string {
        return song.author?.name!;
    }

    toString() {
        return `song author name ${this.include ? "" : "not "}includes "${
            this.value
        }"`;
    }
}
