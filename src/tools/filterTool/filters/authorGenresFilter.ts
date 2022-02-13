import { Song } from "@/spotifyApi/interfaces/song";
import { SelectValueFilter } from "../filter";

export class AuthorGenresFilter extends SelectValueFilter {
    static filterName = "Author genres filter";
    static filterDesc = "Remove songs by author genres";
    static filterIcon = "fas fa-drum";

    getValueToComparison(song: Song): string {
        return song.author?.genres.join("")!;
    }

    getSelectableValues(songs: Song[]): string[] {
        return [
            ...new Set(
                ...songs.map((e: Song) => {
                    return e.author?.genres!;
                })
            ),
        ];
    }

    toString() {
        return `author genres ${this.include ? "" : "dont "}have "${
            this.selected
        }"`;
    }
}
