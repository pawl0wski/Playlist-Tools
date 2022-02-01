<template>
    <UserHeader :avatarUrl="avatarUrl" :username="username" />
    <h2>Select <span class="main-color">playlist</span>.</h2>
    <SearchBar @changeSearchValue="handleChangeSearchValue" />
    <div class="playlists-wrapper">
        <Spinner v-if="fetching" />
        <PlaylistComponent
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
import { SpotifyApiFactory } from "@/spotifyApi/spotifyApiFactory";
import UserHeader from "@/components/UserHeader.vue";
import SearchBar from "@/components/SearchBar.vue";
import Spinner from "@/components/Spinner.vue";
import PlaylistComponent from "@/components/PlaylistSelector/Playlist.vue";
import { Playlist } from "@/spotifyApi/interfaces/playlist";
export default defineComponent({
    components: {
        UserHeader,
        SearchBar,
        PlaylistComponent,
        Spinner,
    },
    computed: {
        filteredPlaylists(): {} {
            return this.$data.playlists;
        },
    },
    data() {
        return {
            searchContent: "",
            playlists: [] as Array<Playlist>,
            onlyMyPlaylists: this.$route.params.onlyMyPlaylists,
            username: "",
            avatarUrl: "",
            fetching: true,
        };
    },
    methods: {
        handleChangeSearchValue(newValue: string) {
            this.$data.searchContent = newValue;
        },
    },
    async beforeCreate() {
        let spotify = SpotifyApiFactory.createSpotifyApiWithDefaultApp();
        // Get username and avatar
        this.$data.username = await spotify.getUsername();
        this.$data.avatarUrl = await spotify.getAvatarUrl();

        // Get playlists
        // Change to boolean if client provide some string, number, undefined etc.
        const onlyMyPlaylists = !!this.$data.onlyMyPlaylists;
        this.$data.playlists = await spotify.getMyPlaylists(onlyMyPlaylists);
        this.$data.fetching = false;

        console.log(spotify.getSongsFromPlaylist("2lWVPwqiQgEuOrtGhdyHYJ"));
    },
});
</script>

<style>
h2:first-of-type {
    text-align: center;
}

div.playlists-wrapper {
    margin-top: 4em;
    width: 100%;

    display: flex;
    align-items: flex-start;
    justify-content: center;

    padding: 0 2em;

    flex-wrap: wrap;

    gap: 2em;
}
</style>