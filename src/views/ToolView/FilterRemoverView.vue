<template>
    <div class="playlist-select" v-if="!playlistToPurge">
        <UserHeader />
        <h2>
            Select <span class="main-color">playlist</span> to apply filters.
        </h2>
        <PlaylistPicker
            :onlyMyPlaylists="true"
            @playlistSelected="onPlaylistSelect"
        />
    </div>
    <div class="filter-remover" v-if="playlistToPurge">
        <PlaylistHeader :playlist="playlistToPurge" />
        <h2 v-if="!loading">
            <span class="main-color">Songs</span> to remove.
        </h2>
        <FiltersList
            v-if="!loading"
            :filters="getFilters"
            @addClicked="addNewFilter()"
            @deleteFilter="deleteFilter"
        />
        <button
            v-if="!loading && isAnySongsToRemove"
            :disabled="buttonDisabled ? 1 : 0"
            @click="deleteFilteredSongsClicked"
        >
            Remove songs
        </button>
        <div class="spinner-wrapper" v-if="loading">
            <Spinner />
            <p>Getting songs from Spotify...</p>
        </div>
        <div class="songs" v-if="!loading">
            <div
                class="song-component"
                :key="song"
                v-for="song in getFilteredSongs"
            >
                <SongCheckbox
                    :selectedOnStart="true"
                    @selectChange="
                        (newSelection) => {
                            onSongSelectionChanged(song, newSelection);
                        }
                    "
                />
                <SongComponent :song="song" />
            </div>
        </div>
        <div class="no-filters" v-if="!isAnySongsToRemove && !loading">
            <i class="fas fa-filter"></i>
            <h3>Add filters.</h3>
            <p>The filters you added did not filter out any songs.</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import UserHeader from "@/components/UserHeader.vue";
import PlaylistPicker from "@/components/PlaylistSelector/PlaylistPicker.vue";
import PlaylistHeader from "@/components/PlaylistHeader.vue";
import SongComponent from "@/components/Song/Song.vue";
import SongCheckbox from "@/components/Song/SongCheckbox.vue";
import Spinner from "@/components/Spinner.vue";
import FiltersList from "@/components/Filter/FiltersList.vue";

import { SpotifyApiFactory } from "@/spotifyApi/spotifyApiFactory";
import { Playlist } from "@/spotifyApi/interfaces/playlist";
import { Song } from "@/spotifyApi/interfaces/song";
import { FilterTool } from "@/tools/filterTool/filterTool";
import { Filter } from "@/tools/filterTool/filter";
import Swal from "sweetalert2";

export default defineComponent({
    components: {
        UserHeader,
        PlaylistPicker,
        PlaylistHeader,
        FiltersList,
        SongComponent,
        SongCheckbox,
        Spinner,
    },
    data(): {
        playlistToPurge?: Playlist;
        filterTool?: FilterTool;
        loading: boolean;
        isAnySongsToRemove: boolean;
        buttonDisabled: boolean;
    } {
        return {
            playlistToPurge: undefined,
            filterTool: undefined,
            loading: false,
            isAnySongsToRemove: false,
            buttonDisabled: false,
        };
    },
    methods: {
        async onPlaylistSelect(playlist: Playlist) {
            this.$data.loading = true;
            this.$data.playlistToPurge = playlist;
            let spotifyApi =
                SpotifyApiFactory.createCachedSpotifyApiWithDefaultApp();
            this.$data.filterTool = new FilterTool(playlist, spotifyApi);
            await this.$data.filterTool!.getSongsFromPlaylist();
            this.$data.loading = false;
        },
        async deleteFilteredSongsClicked() {
            this.$data.buttonDisabled = true;
            await this.$data.filterTool?.doWork();
            this.$data.buttonDisabled = false;
            Swal.mixin({
                toast: true,
                position: "bottom-end",
                timer: 5000,
                timerProgressBar: true,
                showConfirmButton: false,
                background: "#08262D",
                color: "white",
            }).fire({
                icon: "success",
                title: "Songs removed.",
            });
        },
        onSongSelectionChanged(song: Song, newSelection: boolean) {
            this.$data.filterTool?.excludeSongFromFilter(song);
        },

        deleteFilter(filter: Filter) {
            this.$data.filterTool?.dropFilter(filter);
        },
        addNewFilter() {
            const component = this;

            Swal.fire({
                title: "Add a new filter",
                text: "Select new filter to continue",
                confirmButtonColor: "#14CC60",
                background: "#08262D",
                color: "white",
                html: `${this.getAvailableFilters
                    .map((filter) => {
                        return `<div class="selectable-filter" id="f${filter.filterName
                            .toLowerCase()
                            .split(" ")
                            .join("-")}">
                                <div class="filter-image">
                                    <i class="${filter.filterIcon}"></i>
                                </div>
                                <div class="filter-content">
                                    <h3>${filter.filterName}</h3>
                                    <p>${filter.filterDesc}</p>
                                </div>
                            </div>`;
                    })
                    .join(" ")}`,
                didOpen(content) {
                    // Attach onClick event to all selectable filters
                    let filters = component.getAvailableFilters;
                    filters.forEach((f) => {
                        let filterButton = content.querySelector(
                            "#f" +
                                f.filterName.toLowerCase().split(" ").join("-")
                        );
                        filterButton?.addEventListener("click", async () => {
                            let okButton =
                                document.querySelector(".swal2-confirm")!;
                            // @ts-ignore
                            okButton.onclick();

                            let newFilter = new f();
                            if (f.needSongsBeforeInitialization) {
                                // @ts-ignore
                                newFilter.songs =
                                    await component.$data.filterTool?.getSongsFromPlaylist();
                            }
                            await newFilter.editWithSwalBuilder();
                            component.filterTool?.addFilter(newFilter);
                        });
                    });
                },
            });
        },
    },
    computed: {
        getFilters(): Array<Filter> {
            let filters = this.$data.filterTool?.filters;
            return !!filters ? filters : [];
        },
        getAvailableFilters() {
            return FilterTool.availableFilter;
        },
        getFilteredSongs(): Array<Song> {
            let songs = this.$data.filterTool!.getFilteredSongs();
            this.$data.isAnySongsToRemove = !!songs.length;
            return songs;
        },
    },
});
</script>

<style lang="scss" scoped>
h2 {
    text-align: center;
    margin-bottom: 1em;
}

div.spinner-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 5em;
}

div.songs {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5em;
}

div.filter-remover {
    display: flex;
    align-items: center;
    flex-direction: column;
}

button {
    margin-bottom: 1em;
    margin-top: 1em;
}

div.no-filters {
    text-align: center;
    width: 15em;

    margin-top: 200px;

    i:first-child {
        font-size: 52px;
        color: $main-color;
    }

    h3 {
        margin: 0;
        margin-top: 1em;
    }

    p {
        color: $paragraph-color;
        margin: 0;
    }
}

div.song-component {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: min(calc(600px + 2rem + 1rem), 98vw);

    gap: 1rem;
}
</style>

<style lang="scss">
div.selectable-filter {
    width: 100%;
    background-color: $content-color;
    text-align: left;

    display: flex;
    flex-direction: row;
    gap: 1rem;

    align-items: center;

    padding-left: 0.5rem;

    cursor: pointer;

    margin-bottom: 0.5rem;

    border-radius: $border-radius;

    &:hover {
        background-color: lighten($color: $content-color, $amount: 2);
    }

    div.filter-image {
        width: 50px;
        height: 50px;

        display: flex;
        align-items: center;
        justify-content: center;

        i {
            font-size: 30px;
            text-align: center;

            color: $main-color;
        }
    }

    div.filter-content {
        h3,
        p {
            margin: 0;
        }

        p {
            color: $paragraph-color;
        }
    }
}
</style>