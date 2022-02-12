import { Song } from "@/spotifyApi/interfaces/song";
import { SelectRangeFilter } from "../filter";

export class SongTempoFilter extends SelectRangeFilter {
    static filterName = "Song Tempo filter";
    static filterDesc = "Remove songs by value of tempo";
    static filterIcon = "fas fa-gauge-circle-bolt";
    maxValue: number = 250;

    getValueToComparison(song: Song): number {
        return song.songStats?.tempo!;
    }

    toString() {
        return `song tempo ${this.greater ? ">" : "<"} ${this.value} bpm`;
    }
}
