import { Song } from "@/spotifyApi/interfaces/song";
import { SelectRangeFilter } from "../filter";

export class SongInstrumentalnessFilter extends SelectRangeFilter {
    static filterName = "Song instrumentalness filter";
    static filterDesc = "Remove songs by value of instrumentalness";
    static filterIcon = "fas fa-drum";

    getValueToComparison(song: Song): number {
        return song.songStats?.instrumentalness! * 100;
    }

    toString() {
        return `song instrumentalness ${this.greater ? ">" : "<"} ${
            this.value
        }%`;
    }
}
