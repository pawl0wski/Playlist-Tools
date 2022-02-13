import { Song } from "@/spotifyApi/interfaces/song";
import { InputTextFilter } from "../filter";

export class SongNameFilter extends InputTextFilter {
    static filterName = "Song name filter";
    static filterDesc = "Remove songs by name";
    static filterIcon = "fas fa-font";

    getValueToComparison(song: Song): string {
        return song.songName;
    }

    toString() {
        return `song name ${this.include ? "" : "not "}includes "${
            this.value
        }"`;
    }
}
