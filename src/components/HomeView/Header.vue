<template>
    <header>
        <div id="header-filter">
            <h1>
                Organize your playlists with
                <span class="main-color">Spotify Tools</span>.
            </h1>
            <SpotifyLoginButton v-if="!showLoginButton"></SpotifyLoginButton>
        </div>
    </header>
</template>

<script lang="ts">
import SpotifyLoginButton from "../SpotifyLoginButton.vue";
import { SpotifyApiFactory } from "@/spotifyApi/spotifyApiFactory";

export default {
    computed: {
        showLoginButton() {
            let spotify = SpotifyApiFactory.createSpotifyApiWithDefaultApp();
            return spotify.isAuthorized();
        },
    },
    components: {
        SpotifyLoginButton,
    },
};
</script>

<style lang="scss" scoped>
header {
    background-image: url("../../assets/bgimage.jpg");
    background-size: cover;
    background-position: center;

    height: 400px;

    div#header-filter {
        padding: 0px 20px;

        background: rgba(6, 31, 36, 0.69);

        height: 100%;
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        gap: 2em;

        h1 {
            margin: 0;
            text-align: center;
        }
    }
}
</style>