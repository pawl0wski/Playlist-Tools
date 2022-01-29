<template>
  <UserHeader :avatarUrl="avatarUrl" :username="username" />
  <h2>Select <span class="main-color">playlist</span>.</h2>
  <SearchBar @changeSearchValue="handleChangeSearchValue" />
</template>

<script lang="ts">
import { defineComponent} from 'vue'
import { SpotifyCreator } from "@/libs/spotify_connector/spotify_creator"
import UserHeader from "@/components/UserHeader.vue"
import SearchBar from "@/components/SearchBar.vue"
export default defineComponent({
    components: {
        UserHeader,
        SearchBar
    },
    props: {
        onlyMyPlaylists: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            searchContent: "",
            playlists: [],
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
        const onlyCreatedByMe = !!this.$props.onlyMyPlaylists
        if (onlyCreatedByMe) {
            this.$data.playlists = await spotify.getMyPlaylists(onlyCreatedByMe)
        }
    }
})
</script>

<style>
    h2:first-of-type{
        text-align: center;
    }
</style>