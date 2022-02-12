import { Song } from "@/spotifyApi/interfaces/song";
import { InputNumberFilter } from "../filter";
import { SwalBuilder } from "../filterBuilder/swalBuilder";

export class AuthorPopularityFilter extends InputNumberFilter {
    static filterName = "Author popularity filter";
    static filterDesc = "Remove songs by author popularity";
    static filterIcon = "fas fa-fire";

    filter(songs: Song[]): Song[] {
        return songs.filter((e: Song) => {
            return e.author?.popularity;
        });
    }

    toString() {
        return "author popularity < " + this.value;
    }
}
