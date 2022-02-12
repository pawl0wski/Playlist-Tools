import { Song } from "@/spotifyApi/interfaces/song";
import { Filter } from "../filter";

export class SongNotRemoveFilter extends Filter {
    static filterName = "Song filter";
    static filterDesc = "Remove specific song";
    static filterIcon = "fas fa-circle-minus";
    selectedSong: Song;

    constructor(song: Song) {
        super();
        this.selectedSong = song;
    }

    editWithSwalBuilder(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    filter(songs: Array<Song>): Array<Song> {
        return songs.filter((e: Song) => {
            return e.id !== this.selectedSong.id;
        });
    }

    toString() {
        return `dont remove song "${this.selectedSong.songName}"`;
    }
}
