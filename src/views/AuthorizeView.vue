<template>
    <div class="authorize">
        <h2>Authorizing...</h2>
        <Spinner></Spinner>
    </div>
</template>

<script lang="ts">
import Spinner from "@/components/Spinner.vue";
import { SpotifyApiFactory } from "@/spotifyApi/spotifyApiFactory";
import { defineComponent } from "vue";
export default defineComponent({
    components: {
        Spinner,
    },
    async mounted() {
        let urlParams = new URLSearchParams(window.location.hash.slice(1));
        let authorizationToken = urlParams.get("access_token");
        let expiresIn = urlParams.get("expires_in");
        if (expiresIn && authorizationToken) {
            let spotify = SpotifyApiFactory.createSpotifyApiWithDefaultApp();
            spotify.setAuthorizationToken(
                authorizationToken,
                parseInt(expiresIn)
            );
            await this.$router.push({
                name: "Home",
                params: { newAuthorized: 1 },
            });
        }
    },
});
</script>

<style lang="scss" scoped>
div.authorize {
    text-align: center;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    h2 {
        margin: 0;
        margin-bottom: 1em;
    }
}
</style>