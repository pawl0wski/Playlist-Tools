import { Song } from "@/spotifyApi/interfaces/song";
import { InputNumberSwalBuilder } from "./filterBuilder/inputNumberSwalBuilder";
import { SwalBuilder } from "./filterBuilder/swalBuilder";
export abstract class Filter {
    static filterName: string;
    static filterDesc: string;
    static filterIcon: string;

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
    abstract selected: any;

    static getSelectableValues(songs: Array<Song>): Array<any> {
        return [];
    }
}

export abstract class InputNumberFilter extends Filter {
    minValue: number = 0;
    maxValue: number = 100;
    value: number = 0;

    async editWithSwalBuilder() {
        let swalBuilder = new InputNumberSwalBuilder(
            "Select value",
            `Select value from ${this.minValue} to ${this.maxValue}`,
            this.minValue,
            this.maxValue
        );
        this.value = await swalBuilder.build();
    }

    constructor(value: number = 0) {
        super();

        this.value = value;
    }
}

export abstract class InputTextFilter extends Filter {
    abstract value: string;
}
