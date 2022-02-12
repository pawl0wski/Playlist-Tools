import { Song } from "@/spotifyApi/interfaces/song";
import { SelectRangeFilter } from "../filter";

export class SongAcousticnessFilter extends SelectRangeFilter {
    static filterName = "Song acousticness filter";
    static filterDesc = "Remove songs by value of acoustic.";
    static filterIcon = "fas fa-guitar";

    getValueToComparison(song: Song): number {
        return song.songStats?.acousticness! * 100;
    }

    toString() {
        return `song acousticness ${this.greater ? ">" : "<"} ${this.value}%`;
    }
}
