import { Author } from "./author";
import { SongStats } from "./songstats";

export interface Song {
    id: string;
    author: Author | undefined;
    songName: string;
    releaseDate: Date;
    duration: number;
    songStats: SongStats | undefined;
    trackNumber: number;
    previewUrl: string;
    imageUrl: string | undefined;
    explicit: boolean;
    markets: Array<string>;
}
