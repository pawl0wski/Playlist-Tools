import { Author } from "@/spotifyApi/interfaces/author";
import { Song } from "@/spotifyApi/interfaces/song";
import { SelectValueFilter } from "../filter";

export class AuthorFilter extends SelectValueFilter {
    static filterName = "Author Filter";
    static filterDesc = "Remove songs by artist";
    static filterIcon = "fas fa-user-music";
    selected: Author;

    constructor(author: Author) {
        super();
        this.selected = author;
    }

    static getSelectableValues(songs: Song[]): any[] {
        return songs.map((e: Song) => {
            return e.author;
        });
    }

    filter(songs: Song[]): Song[] {
        return songs.filter((e: Song) => {
            return e.id === this.selected.id;
        });
    }
}
