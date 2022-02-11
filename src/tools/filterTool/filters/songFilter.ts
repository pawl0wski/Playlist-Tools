import { Song } from "@/spotifyApi/interfaces/song";
import { Filter, FilterType } from "../filter";

export class SongFilter extends Filter {
    filterName = "Song filter";
    filterDesc = "Remove specific song";
    filterIcon = "fa-solid fa-circle-minus";
    filterType = FilterType.selectValue;
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
