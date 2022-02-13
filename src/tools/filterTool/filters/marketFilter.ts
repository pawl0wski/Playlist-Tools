import { Song } from "@/spotifyApi/interfaces/song";
import { SelectValueFilter } from "../filter";

export class MarketFilter extends SelectValueFilter {
    static filterName = "Market filter";
    static filterDesc = "Remove the song if it is available in country";
    static filterIcon = "fas fa-flag";
    getValueToComparison(song: Song): string {
        return song.markets.join("");
    }

    getSelectableValues(songs: Song[]): string[] {
        return [
            ...new Set(
                ...songs.map((e: Song) => {
                    return e.markets;
                })
            ),
        ];
    }

    toString() {
        return `song ${this.include ? "" : "not "}available in ${
            this.selected
        } `;
    }
}
