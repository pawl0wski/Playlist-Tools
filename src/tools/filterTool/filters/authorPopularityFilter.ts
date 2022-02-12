import { Song } from "@/spotifyApi/interfaces/song";
import { InputNumberFilter } from "../filter";

export class AuthorPopularityFilter extends InputNumberFilter {
    value: number;
    maxValue: number = 100;
    minValue: number = 0;
    static filterName = "Author popularity filter";
    static filterDesc = "Remove songs by author popularity";
    static filterIcon = "fas fa-fire";

    constructor(value: number) {
        super();
        this.value = value;
    }

    filter(songs: Song[]): Song[] {
        return songs.filter((e: Song) => {
            return e.author?.popularity;
        });
    }
}
