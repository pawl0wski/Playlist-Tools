import { Song } from "@/spotifyApi/interfaces/song";

export enum FilterType {
    yesOrNo = 1,
    selectValue = 2,
    inputText = 3,
}

export abstract class Filter {
    abstract filterName: string;
    abstract filterDesc: string;
    abstract filterIcon: string;
    abstract filterType: FilterType;

    abstract filter(songs: Array<Song>): Array<Song>;

    toString() {
        return this.filterName;
    }
}
