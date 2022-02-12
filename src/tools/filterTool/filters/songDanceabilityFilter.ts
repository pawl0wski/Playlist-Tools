import { Song } from "@/spotifyApi/interfaces/song";
import { InputNumberFilter } from "../filter";

export class SongDanceabilityFilter extends InputNumberFilter {
    static filterName = "Song danceability filter";
    static filterDesc = "Remove songs by danceability";
    static filterIcon = "fas fa-face-laugh-beam";

    filter(songs: Song[]): Song[] {
        return songs.filter((e: Song) => {
            return e.songStats?.danceability! < this.value / 100;
        });
    }

    toString() {
        return `song danceability < ${this.value}%`;
    }
}
