import { Playlist } from "@/spotifyApi/interfaces/playlist";
import { Song } from "@/spotifyApi/interfaces/song";
import { SpotifyApi } from "@/spotifyApi/spotifyApi";
import { AbstractTool } from "../tool";

export class DuplicationRemoverTool extends AbstractTool {
    private duplicatedSongs: Array<{
        song: Song;
        howMuchDuplications: number;
    }>;

    constructor(playlist: Playlist, spotifyApi: SpotifyApi) {
        super(playlist, spotifyApi);
        this.duplicatedSongs = [];
    }

    async doWork() {
        if (!this.playlistSongs) {
            await this.getSongsFromPlaylist();
        }
        this.getDuplications();
        await this.removeDuplications();
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

    getDuplications(): Array<{
        song: Song;
        howMuchDuplications: number;
    }> {
        if (this.duplicatedSongs.length == 0) {
            let songCount: { [key: string]: number } = {};
            this.playlistSongs!.forEach((e: Song) => {
                if (Object.keys(songCount).includes(e.id)) {
                    songCount[e.id] += 1;
                } else {
                    songCount[e.id] = 1;
                }
            });
            for (const songId in songCount) {
                if (songCount[songId] > 1) {
                    this.duplicatedSongs.push({
                        song: this.playlistSongs!.filter((e: Song) => {
                            return e.id == songId;
                        })[0],
                        howMuchDuplications: songCount[songId],
                    });
                }
            }
        }
        return this.duplicatedSongs;
    }

    async removeDuplications() {
        let songsToRemove: Array<Song> = [];

        this.duplicatedSongs.forEach(
            (e: { song: Song; howMuchDuplications: number }) => {
                songsToRemove.push(e.song);
            }
        );

        await this.spotifyApi.removeSongsFromPlaylist(
            this.playlist,
            songsToRemove
        );

        await this.spotifyApi.addSongsToPlaylist(this.playlist, songsToRemove);
    }
}
