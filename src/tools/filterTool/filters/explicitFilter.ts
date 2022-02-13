import { Song } from "@/spotifyApi/interfaces/song";
import { SelectValueFilter } from "../filter";

export class ExplicitFilter extends SelectValueFilter {
    static filterName = "Explicit filter";
    static filterDesc = "Remove the song if it is explicit";
    static filterIcon = "fas fa-face-angry";

    getValueToComparison(song: Song): string {
        return song.explicit ? "yes" : "no";
    }

    getSelectableValues(songs: Song[]): string[] {
        return ["yes", "no"];
    }

    toString() {
        let negate = this.selected === "yes";
        negate = this.include ? negate : !negate;
        return `${negate ? "" : "don't"} have explicit`;
    }
}
