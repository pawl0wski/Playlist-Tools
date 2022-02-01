import { Playlist } from "@/spotifyApi/interfaces/playlist";
import { Song } from "@/spotifyApi/interfaces/song";
import { SpotifyApi } from "@/spotifyApi/spotifyApi";
import { AbstractTool } from "../tool";

export class CopyTool extends AbstractTool {
    private newPlaylistName: string;
    private newPlaylist: Playlist | undefined;

    constructor(
        playlist: Playlist,
        spotifyApi: SpotifyApi,
        newPlaylistName: string
    ) {
        super(playlist, spotifyApi);
        this.newPlaylistName = newPlaylistName;
    }

    async doWork() {
        await this.getSongsFromPlaylist();
        await this.createNewPlaylist();
        await this.copySongsToNewPlaylist();
    }

    async getSongsFromPlaylist(): Promise<Array<Song>> {
        let songsFromPlaylist = await this.spotifyApi.getSongsFromPlaylist(
            this.playlist.id,
            false,
            false
        );
        this.playlistSongs = songsFromPlaylist;
        return songsFromPlaylist;
    }

    async createNewPlaylist(): Promise<Playlist> {
        this.newPlaylist = await this.spotifyApi.createNewPlaylist(
            this.newPlaylistName
        );
        return this.newPlaylist;
    }

    async copySongsToNewPlaylist(): Promise<void> {
        return await this.spotifyApi.addSongsToPlaylist(
            this.newPlaylist!,
            this.playlistSongs!
        );
    }
}
