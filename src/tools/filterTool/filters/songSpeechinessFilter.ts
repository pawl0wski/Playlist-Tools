import { Song } from "@/spotifyApi/interfaces/song";
import { SelectRangeFilter } from "../filter";

export class SongSpeechinessFilter extends SelectRangeFilter {
    static filterName = "Song spechiness filter";
    static filterDesc = "Remove songs by value of spechiness";
    static filterIcon = "fas fa-comment";
    getValueToComparison(song: Song): number {
        return song.songStats?.speechiness! * 100;
    }
    toString() {
        return `song spechiness ${this.greater ? ">" : "<"} ${this.value}%`;
    }
}
