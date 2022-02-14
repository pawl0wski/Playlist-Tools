<template>
    <header>
        <div
            class="playlist-cover"
            :style="{ backgroundImage: 'url(' + playlist.imageUrl + ')' }"
        ></div>
        <div class="playlist-content">
            <h2>{{ playlist.name }}</h2>
            <p>{{ playlist.description }}</p>
            <img
                class="spotify-logo"
                src="../assets/spotify.png"
                alt="Spotify logo"
            />
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Playlist } from "@/spotifyApi/interfaces/playlist";

export default defineComponent({
    props: {
        playlist: {
            type: Object as () => Playlist,
            required: true,
        },
    },
});
</script>

<style lang="scss" scoped>
header {
    width: 100%;
    min-height: 300px;
    background-color: $content-color;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    div.playlist-cover {
        height: 170px;
        width: 170px;
        background-color: red;

        background-position: center;
        background-size: cover;
    }

    div.playlist-content {
        display: flex;
        flex-direction: column;

        max-width: 22em;

        padding: 1.5em;

        p {
            color: $paragraph-color;
            margin-bottom: 0;
        }

        h2:first-child {
            margin: 0;
        }
    }
    img.spotify-logo {
        margin-top: 1rem;
        height: auto;
        width: 80px;
    }
}

@media screen and (max-width: 700px) {
    header {
        flex-direction: column;
        text-align: center;

        padding: 2em;
    }

    img.spotify-logo {
        margin: 0 auto;
    }

    div.playlist-content {
        padding-bottom: 0 !important;
    }
}
</style>