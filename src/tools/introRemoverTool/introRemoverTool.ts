import { Playlist } from "@/spotifyApi/interfaces/playlist";
import { Song } from "@/spotifyApi/interfaces/song";
import { AbstractTool } from "../tool";

export class IntroRemoverTool extends AbstractTool {
    private introsHaveInName = ["intro", "instructions", "skit", "preambuła"];
    private introsLength = 60 * 1000; // Max intro length in milliseconds
    private introPopularity = 55; // Max intro popularity
    private excludedSongs: Array<Song> = [];

    async doWork() {
        let intros = this.getIntros();
        await this.removeSongs(intros);
    }

    async getSongsFromPlaylist(): Promise<Array<Song>> {
        let songsFromPlaylist = await this.spotifyApi.getSongsFromPlaylist(
            this.playlist.id,
            false,
            true
        );
        this.playlistSongs = songsFromPlaylist;
        return songsFromPlaylist;
    }

    getIntros(): Array<Song> {
        let intros: Array<Song> | undefined = [];
        intros = this.playlistSongs
            ?.map((e: Song) => {
                if (
                    this.introsHaveInName.some((introName: string) => {
                        return e.songName.toLowerCase().includes(introName);
                    })
                ) {
                    return e;
                }

                // Check if song is firsts in album
                if (e.trackNumber === 1) {
                    // Check song name

                    if (e.duration < this.introsLength) {
                        return e;
                    }
                }
            })
            .filter((e: Song | undefined): e is Song => {
                return e !== undefined;
            });

        if (intros === undefined) {
            return [];
        }

        return intros;
    }

    addExcludedSong(songToExclude: Song) {
        if (!this.excludedSongs.includes(songToExclude)) {
            this.excludedSongs.push(songToExclude);
        }
    }

    restoreExcludedSong(songToRestore: Song) {
        this.excludedSongs = this.excludedSongs.filter((e: Song) => {
            return e !== songToRestore;
        });
    }

    async removeSongs(intros: Array<Song>) {
        intros = intros.filter((e: Song) => {
            return !this.excludedSongs.includes(e);
        });
        await this.spotifyApi.removeSongsFromPlaylist(this.playlist, intros);
    }
}
