import { Song } from "@/spotifyApi/interfaces/song";
import { AbstractTool } from "../tool";
import { Filter } from "./filter";
import { AuthorFilter } from "./filters/authorFilter";
import { AuthorPopularityFilter } from "./filters/authorPopularityFilter";
import { SongNotRemoveFilter } from "./filters/songNotRemoveFilter";
import { SongNameFilter } from "./filters/songNameFilter";
import { SongDanceabilityFilter } from "./filters/songDanceabilityFilter";

export class FilterTool extends AbstractTool {
    static availableFilter = [
        // AuthorFilter,
        // SongFilter,
        // SongNameFilter,
        AuthorPopularityFilter,
        SongDanceabilityFilter,
    ];
    filters: Array<Filter> = [];

    public async doWork(): Promise<void> {
        await this.getSongsFromPlaylist();

        let songsToDelete = this.getFilteredSongs();

        this.filters = [];

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

    getFilteredSongs(): Array<Song> {
        let playlistSongs = this.playlistSongs!;
        let songsToDelete: Array<Song> = [];

        this.filters
            .filter((filter: Filter) => {
                return !(filter instanceof SongNotRemoveFilter);
            })
            .forEach((filter: Filter) => {
                let filteredSongsByThisFilter = filter.filter(
                    this.playlistSongs!
                );
                playlistSongs = playlistSongs.filter((e: Song) => {
                    return !filteredSongsByThisFilter.includes(e);
                });
                songsToDelete.push(...filteredSongsByThisFilter);
            });

        this.filters
            .filter((filter: Filter) => {
                return filter instanceof SongNotRemoveFilter;
            })
            .forEach((filter: Filter) => {
                songsToDelete = filter.filter(songsToDelete);
            });

        return songsToDelete;
    }

    getFilters(): Array<Filter> {
        return this.filters;
    }

    addFilter(filter: Filter) {
        this.filters.push(filter);
    }

    dropFilter(filter: Filter) {
        this.filters = this.filters.filter((f: Filter) => {
            return f !== filter;
        });
    }

    excludeSongFromFilter(song: Song) {
        this.addFilter(new SongNotRemoveFilter(song));
    }

    async removeSongs(songsToRemove: Array<Song>) {
        await this.spotifyApi.removeSongsFromPlaylist(
            this.playlist,
            songsToRemove
        );
    }
}
