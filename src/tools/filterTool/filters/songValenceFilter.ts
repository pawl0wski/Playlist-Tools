import { Song } from "@/spotifyApi/interfaces/song";
import { SelectRangeFilter } from "../filter";

export class SongValenceFilter extends SelectRangeFilter {
    static filterName = "Song valence filter";
    static filterDesc = "Remove songs by value of valence";
    static filterIcon = "fas fa-gauge";

    getValueToComparison(song: Song): number {
        return song.songStats?.valence! * 100;
    }

    toString() {
        console.log(this.greater);
        return `song valence ${this.greater ? ">" : "<"} ${this.value} %`;
    }
}
