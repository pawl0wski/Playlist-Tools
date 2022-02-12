import { Song } from "@/spotifyApi/interfaces/song";
import { Filter } from "../filter";

export class SongFilter extends Filter {
    static filterName = "Song filter";
    static filterDesc = "Remove specific song";
    static filterIcon = "fas fa-circle-minus";
    selectedSong: Song;

    constructor(song: Song) {
        super();
        this.selectedSong = song;
    }

    filter(songs: Array<Song>): Array<Song> {
        return songs.filter((e: Song) => {
            return e.id === this.selectedSong.id;
        });
    }
}
