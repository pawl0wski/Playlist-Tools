import { Song } from "@/spotifyApi/interfaces/song";
import { SelectRangeFilter } from "../filter";

export class SongDanceabilityFilter extends SelectRangeFilter {
    static filterName = "Song danceability filter";
    static filterDesc = "Remove songs by danceability";
    static filterIcon = "fas fa-face-laugh-beam";

    getValueToComparison(song: Song): number {
        return song.songStats?.danceability! * 100;
    }

    toString() {
        return `song danceability ${this.greater ? ">" : "<"} ${this.value}%`;
    }
}
