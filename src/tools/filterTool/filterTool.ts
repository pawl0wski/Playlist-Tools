import { Song } from "@/spotifyApi/interfaces/song";
import { AbstractTool } from "../tool";
import { Filter } from "./filter";
import { SongFilter } from "./filters/songFilter";

class FilterTool extends AbstractTool {
    filters: Array<Filter> = [];

    public async doWork(): Promise<void> {
        await this.getSongsFromPlaylist();

        let playlistSongs = this.playlistSongs!;
        let songsToDelete: Array<Song> = [];

        this.filters.forEach((filter: Filter) => {
            let filteredSongsByThisFilter = filter.filter(this.playlistSongs!);
            playlistSongs = playlistSongs.filter((e: Song) => {
                return !filteredSongsByThisFilter.includes(e);
            });
            songsToDelete.push(...filteredSongsByThisFilter);
        });

        await this.removeSongs(songsToDelete);
    }

    async getSongsFromPlaylist(): Promise<Array<Song>> {
        let songsFromPlaylist = await this.spotifyApi.getSongsFromPlaylist(
            this.playlist.id,
            true,
            true
        );
        this.playlistSongs = songsFromPlaylist;
        return songsFromPlaylist;
    }

    getFilters(): Array<Filter> {
        return this.filters;
    }

    addFilter(filter: Filter) {
        this.filters.push(filter);
    }

    dropFilter(filter: Filter) {
        this.filters = this.filters.filter((f: Filter) => {
            return f === filter;
        });
    }

    excludeSongFromFilter(song: Song) {
        this.addFilter(new SongFilter(song));
    }

    async removeSongs(songsToRemove: Array<Song>) {
        await this.spotifyApi.removeSongsFromPlaylist(
            this.playlist,
            songsToRemove
        );
    }
}
