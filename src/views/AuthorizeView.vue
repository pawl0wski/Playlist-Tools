<template>
    <div class="authorize">
        <h2>Authorizing...</h2>
        <Spinner></Spinner>
    </div>
</template>

<script lang="ts">
import Spinner from "@/components/Spinner.vue";
import { SpotifyCreator } from '@/libs/spotify_connector/spotify_creator';
import { defineComponent } from "vue";
export default defineComponent({
    components: {
        Spinner
    },
    async mounted () {
        let urlParams = new URLSearchParams(window.location.hash.slice(1));
        let authCode = urlParams.get("access_token");
        if (typeof authCode === 'string' && authCode) {
            let spotify = SpotifyCreator.createSpotifyWithDefaultApp();
            await spotify.setAccessToken(authCode);
            await this.$router.push({name: "Home", params: {newAuthorized: 1}})
        }
    }
})
</script>

<style lang="scss" scoped>
    div.authorize{
        text-align: center;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        h2{
            margin: 0;
            margin-bottom: 1em;
        }
    }
</style>