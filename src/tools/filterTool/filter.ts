import { Song } from "@/spotifyApi/interfaces/song";
export abstract class Filter {
    static filterName: string;
    static filterDesc: string;
    static filterIcon: string;

    abstract filter(songs: Array<Song>): Array<Song>;

    toString() {
        return "";
    }
}

export abstract class YesNoFilter extends Filter {
    abstract selected: boolean;
}

export abstract class SelectValueFilter extends Filter {
    abstract selected: any;

    static getSelectableValues(songs: Array<Song>): Array<any> {
        return [];
    }
}

export abstract class InputNumberFilter extends Filter {
    abstract maxValue: number;
    abstract minValue: number;
    abstract value: number;
}

export abstract class InputTextFilter extends Filter {
    abstract value: string;
}
