<template>
    <div class="playlist">
        <div
            :style="{
                backgroundImage:
                    imageUrl !== undefined ? 'url(' + imageUrl + ')' : '',
            }"
            class="playlist-cover"
        ></div>
        <h3 class="playlist-title">{{ title }}</h3>
        <p class="playlist-description">{{ description }}</p>
        <img
            class="spotify-logo"
            src="../../assets/spotify.png"
            alt="Spotify logo"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        title: String,
        description: String,
        imageUrl: String,
    },
});
</script>

<style lang="scss" scoped>
div.playlist {
    background-color: $content-color;
    width: 230px;
    min-height: 300px;
    padding: 1em;

    border-radius: $border-radius;

    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;

    cursor: pointer;

    transition: 0.1s background-color;

    h3.playlist-title {
        margin-top: 1em;
        margin-bottom: 0;
    }

    div.playlist-cover {
        width: calc(230px / 10 * 9);
        height: calc(230px / 10 * 9);

        background-size: cover;
        background-position: center;
        background-image: url("../../assets/cover.jpg");
    }

    p.playlist-description {
        color: $paragraph-color;
        margin: 0.5em 0;
    }

    &:hover {
        background-color: lighten($color: $content-color, $amount: 0.7);
    }

    img.spotify-logo {
        height: 24px;
    }
}
</style>