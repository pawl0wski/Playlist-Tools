import { Playlist } from "@/spotifyApi/interfaces/playlist";
import { Song } from "@/spotifyApi/interfaces/song";
import { SpotifyApi } from "@/spotifyApi/spotifyApi";
import { AbstractTool } from "../tool";

export class DuplicationRemoverTool extends AbstractTool {
    private duplicatedSongs: Array<{
        songs: Array<Song>;
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
        songs: Array<Song>;
    }> {
        if (this.duplicatedSongs.length == 0) {
            let duplicatedSongs: { [key: string]: Array<Song> } = {};
            this.playlistSongs!.forEach((e: Song) => {
                let lowerCasedSongName = e.songName.toLowerCase();
                let lowerCasedAuthorName = e.author?.name.toLowerCase();
                if (
                    Object.keys(duplicatedSongs).includes(
                        lowerCasedAuthorName + lowerCasedSongName
                    )
                ) {
                    duplicatedSongs[
                        lowerCasedAuthorName + lowerCasedSongName
                    ].push(e);
                } else {
                    duplicatedSongs[lowerCasedAuthorName + lowerCasedSongName] =
                        [e];
                }
            });

            for (const songId in duplicatedSongs) {
                if (duplicatedSongs[songId].length > 1) {
                    this.duplicatedSongs.push({
                        songs: duplicatedSongs[songId],
                    });
                }
            }
        }
        return this.duplicatedSongs;
    }

    async removeDuplications() {
        let songsToRemove: Array<Song> = [];
        let songsToKeep: Array<Song> = [];

        this.duplicatedSongs.forEach(
            (arrayOfSongsToRemove: { songs: Array<Song> }) => {
                songsToKeep.push(arrayOfSongsToRemove.songs[0]);
                arrayOfSongsToRemove.songs.forEach((e: Song) => {
                    songsToRemove.push(e);
                });
            }
        );

        await this.spotifyApi.removeSongsFromPlaylist(
            this.playlist,
            songsToRemove
        );

        await this.spotifyApi.addSongsToPlaylist(this.playlist, songsToKeep);
    }
}
