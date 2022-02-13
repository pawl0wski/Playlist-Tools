import { Song } from "@/spotifyApi/interfaces/song";
import { InputTextSwalBuilder } from "./filterBuilder/inputTextSwalBuilder";
import { SelectRangeSwalBuilder } from "./filterBuilder/selectRangeSwalBuilder";
import { SelectValueSwalBuilder } from "./filterBuilder/selectValueSwalBuilder";
export abstract class Filter {
    static filterName: string;
    static filterDesc: string;
    static filterIcon: string;
    static needSongsBeforeInitialization: boolean = false;

    abstract editWithSwalBuilder(): Promise<void>;

    abstract filter(songs: Array<Song>): Array<Song>;

    toString() {
        return "";
    }
}

export abstract class YesNoFilter extends Filter {
    abstract selected: boolean;
}

export abstract class SelectValueFilter extends Filter {
    selected: string = "";
    include: boolean = true;
    public songs: Array<Song> = [];
    static needSongsBeforeInitialization: boolean = true;

    abstract getValueToComparison(song: Song): string;

    filter(songs: Song[]): Song[] {
        return songs.filter((song: Song) => {
            return this.include
                ? this.getValueToComparison(song)
                      .toLowerCase()
                      .includes(this.selected)
                : !this.getValueToComparison(song)
                      .toLowerCase()
                      .includes(this.selected);
        });
    }

    async editWithSwalBuilder() {
        let swalBuilder = new SelectValueSwalBuilder(
            "Select value",
            ``,
            this.getSelectableValues(this.songs)
        );
        let dataFromAlert = await swalBuilder.build();
        this.selected = dataFromAlert.value;
        this.include = dataFromAlert.include;
    }

    abstract getSelectableValues(songs: Array<Song>): Array<string>;
}

export abstract class SelectRangeFilter extends Filter {
    minValue: number = 0;
    maxValue: number = 100;
    value: number = 0;
    greater: boolean = true;

    abstract getValueToComparison(song: Song): number;

    filter(songs: Song[]): Song[] {
        return songs.filter((song: Song) => {
            return this.greater
                ? this.getValueToComparison(song) > this.value
                : this.getValueToComparison(song) < this.value;
        });
    }

    async editWithSwalBuilder() {
        let swalBuilder = new SelectRangeSwalBuilder(
            "Select range",
            `Select value from ${this.minValue} to ${this.maxValue}`,
            this.minValue,
            this.maxValue
        );
        let dataFromAlert = await swalBuilder.build();
        this.value = dataFromAlert.value;
        this.greater = dataFromAlert.greater;
    }

    constructor(value: number = 0) {
        super();

        this.value = value;
    }
}

export abstract class InputTextFilter extends Filter {
    value: string = "";
    include: boolean = true;

    async editWithSwalBuilder() {
        let swalBuilder = new InputTextSwalBuilder("Input text to filter", "");
        let dataFromAlert = await swalBuilder.build();
        this.value = dataFromAlert.value.toLowerCase();
        this.include = dataFromAlert.include;
    }

    abstract getValueToComparison(song: Song): string;

    filter(songs: Song[]): Song[] {
        return songs.filter((song: Song) => {
            return this.include
                ? this.getValueToComparison(song)
                      .toLowerCase()
                      .includes(this.value)
                : !this.getValueToComparison(song)
                      .toLowerCase()
                      .includes(this.value);
        });
    }
}
