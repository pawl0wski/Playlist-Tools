import { Song } from "@/spotifyApi/interfaces/song";
import { SelectValueFilter } from "../filter";

export class AuthorFilter extends SelectValueFilter {
    static filterName = "Author Filter";
    static filterDesc = "Remove songs by artist";
    static filterIcon = "fas fa-user-music";

    getValueToComparison(song: Song): string {
        return song.author?.name!;
    }

    getSelectableValues(songs: Song[]): string[] {
        return [
            ...new Set(
                songs.map((e: Song) => {
                    return e.author?.name!;
                })
            ),
        ];
    }

    toString() {
        return `author is${this.include ? "" : " not"} "${this.selected}"`;
    }
}
