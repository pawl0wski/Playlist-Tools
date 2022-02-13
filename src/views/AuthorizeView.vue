<template>
    <div class="authorize">
        <h2>Authorizing...</h2>
        <Spinner></Spinner>
    </div>
</template>

<script lang="ts">
import Spinner from "@/components/Spinner.vue";
import { SpotifyApiFactory } from "@/spotifyApi/spotifyApiFactory";
import Swal from "sweetalert2";
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
            let spotify =
                SpotifyApiFactory.createCachedSpotifyApiWithDefaultApp();
            spotify.setAuthorizationToken(
                authorizationToken,
                parseInt(expiresIn)
            );
            try {
                await spotify.getMeId();
            } catch (e) {
                await Swal.fire({
                    title: "You are not added as a tester",
                    text: "We are waiting for Spotify to allow us to publish the application to more users. Add your API key or wait a few days.",
                    icon: "error",
                });
                spotify.logOut();
                await this.$router.push({
                    name: "Home",
                });
            }
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