import { Author } from "@/spotifyApi/interfaces/author";
import { Song } from "@/spotifyApi/interfaces/song";
import { InputTextFilter } from "../filter";

export class SongNameFilter extends InputTextFilter {
    static filterName = "Song name filter";
    static filterDesc = "Remove songs by name";
    static filterIcon = "fas fa-text";
    value: string;

    constructor(value: string) {
        super();
        this.value = value.toLowerCase();
    }

    filter(songs: Song[]): Song[] {
        return songs.filter((e: Song) => {
            return e.songName.toLowerCase().includes(this.value);
        });
    }
}
