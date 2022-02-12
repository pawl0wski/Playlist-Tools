import { Song } from "@/spotifyApi/interfaces/song";
import { SelectRangeFilter } from "../filter";

export class SongEnergyFilter extends SelectRangeFilter {
    static filterName = "Song energy filter";
    static filterDesc = "Remove songs by value of energy";
    static filterIcon = "fas fa-bolt";
    getValueToComparison(song: Song): number {
        return song.songStats?.energy! * 100;
    }

    toString() {
        return `song energy ${this.greater ? ">" : "<"} ${this.value}%`;
    }
}
