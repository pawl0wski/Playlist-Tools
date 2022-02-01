<template>
    <br />
    <SearchBar @changeSearchValue="handleChangeSearchValue" />
    <div class="spinner-wrapper">
        <Spinner v-if="isLoading" />
    </div>
    <div class="playlists-wrapper" v-if="!isLoading">
        <PlaylistComponent
            @click="onPlaylistSelected(playlist)"
            :key="playlist.id"
            v-for="playlist in filteredPlaylists"
            :description="playlist.description"
            :title="playlist.name"
            :imageUrl="playlist.imageUrl"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import Spinner from "@/components/Spinner.vue";
import PlaylistComponent from "@/components/PlaylistSelector/Playlist.vue";
import { Playlist } from "@/spotifyApi/interfaces/playlist";
import { SpotifyApiFactory } from "@/spotifyApi/spotifyApiFactory";

export default defineComponent({
    components: {
        SearchBar,
        Spinner,
        PlaylistComponent,
    },
    props: {
        onlyMyPlaylists: {
            type: Boolean,
            default: false,
        },
        refreshCaller: {
            type: Boolean,
        },
    },
    data(): {
        playlists: Array<Playlist>;
        searchContent: string;
        isLoading: boolean;
    } {
        return {
            playlists: [],
            searchContent: "",
            isLoading: true,
        };
    },
    computed: {
        filteredPlaylists(): Playlist[] {
            return this.$data.playlists.filter((e: Playlist) => {
                return (
                    e.name.toLowerCase().includes(this.$data.searchContent) ||
                    e.description
                        .toLowerCase()
                        .includes(this.$data.searchContent)
                );
            });
        },
    },
    watch: {
        refreshCaller: function () {
            this.refreshPlaylists();
        },
    },
    methods: {
        handleChangeSearchValue(newVal: string) {
            this.$data.searchContent = newVal;
        },
        onPlaylistSelected(selectedPlaylist: Playlist) {
            this.$emit("playlistSelected", selectedPlaylist);
        },
        async refreshPlaylists() {
            this.$data.isLoading = true;
            let spotify =
                SpotifyApiFactory.createCachedSpotifyApiWithDefaultApp();
            this.$data.playlists = await spotify.getMyPlaylists(
                this.$props.onlyMyPlaylists
            );
            this.$data.isLoading = false;
        },
    },
    emits: ["playlistSelected"],
    async created() {
        await this.refreshPlaylists();
    },
});
</script>

<style lang="scss" scoped>
div.playlists-wrapper {
    margin-top: 3em;
    width: 100%;

    display: flex;
    align-items: flex-start;
    justify-content: center;

    padding: 0 2em;

    flex-wrap: wrap;

    gap: 2em;
}

div.spinner-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3em;
}
</style>