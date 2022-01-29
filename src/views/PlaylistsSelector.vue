<template>
  <UserHeader :avatarUrl="avatarUrl" :username="username" />
  <h2>Select <span class="main-color">playlist</span>.</h2>
  <SearchBar @changeSearchValue="handleChangeSearchValue" />
  <div class="playlists-wrapper">
      <Playlist :key="playlist" v-for="playlist in filteredPlaylists" :description="playlist.description" :title="playlist.name" :imageUrl="playlist.images[0].url" />
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue'
import { SpotifyCreator } from "@/libs/spotify_connector/spotify_creator"
import UserHeader from "@/components/UserHeader.vue"
import SearchBar from "@/components/SearchBar.vue"
import Playlist from "@/components/PlaylistSelector/Playlist.vue"
export default defineComponent({
    components: {
        UserHeader,
        SearchBar,
        Playlist,
    },
    computed: {
        filteredPlaylists(): {} {
            return this.$data.playlists
        }
    },
    data() {
        return {
            searchContent: "",
            playlists: [],
            onlyMyPlaylists: this.$route.params.onlyMyPlaylists,
            username: "",
            avatarUrl: ""
        }
    },
    methods: {
        handleChangeSearchValue (newValue : string) {
            this.$data.searchContent = newValue
        }
    },
    async beforeCreate() {
        let spotify = SpotifyCreator.createSpotifyWithDefaultApp()
        // Get username and avatar
        this.$data.username = await spotify.getUsername()
        this.$data.avatarUrl = await spotify.getAvatarUrl()

        // Get playlists
        // Change to Boolean if client provide some string, number, undefined etc.
        const onlyMyPlaylists = !!this.$data.onlyMyPlaylists
        if (onlyMyPlaylists) {
            this.$data.playlists = await spotify.getMyPlaylists(onlyMyPlaylists)
        }
    }
})
</script>

<style>
    h2:first-of-type{
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