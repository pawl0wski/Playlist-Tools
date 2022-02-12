import { Song } from "@/spotifyApi/interfaces/song";
import { SelectRangeFilter } from "../filter";

export class SongLivenessFilter extends SelectRangeFilter {
    static filterName = "Song liveness filter";
    static filterDesc = "Remove songs by value of liveness";
    static filterIcon = "fas fa-person-running";
    getValueToComparison(song: Song): number {
        return song.songStats?.liveness! * 100;
    }
    toString() {
        return `song liveness ${this.greater ? ">" : "<"} ${this.value}%`;
    }
}
