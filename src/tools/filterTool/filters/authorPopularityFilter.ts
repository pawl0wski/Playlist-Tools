import { Song } from "@/spotifyApi/interfaces/song";
import { SelectRangeFilter } from "../filter";
import { SwalBuilder } from "../filterBuilder/swalBuilder";

export class AuthorPopularityFilter extends SelectRangeFilter {
    static filterName = "Author popularity filter";
    static filterDesc = "Remove songs by author popularity";
    static filterIcon = "fas fa-fire";

    getValueToComparison(song: Song): number {
        return song.author?.popularity!;
    }

    toString() {
        return `author popularity ${this.greater ? ">" : "<"} ${this.value}`;
    }
}
