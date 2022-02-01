import { Playlist } from "@/spotifyApi/interfaces/playlist";
import { Song } from "@/spotifyApi/interfaces/song";
import { SpotifyApi } from "@/spotifyApi/spotifyApi";

export abstract class AbstractTool {
    protected playlist: Playlist;
    protected playlistSongs: Array<Song> | undefined;
    protected spotifyApi: SpotifyApi;

    public constructor(playlist: Playlist, spotifyApi: SpotifyApi) {
        this.playlist = playlist;
        this.spotifyApi = spotifyApi;
    }

    public abstract doWork(): void;

    public abstract getSongsFromPlaylist(): Promise<Array<Song>>;
}
