<template>
    <div class="song">
        <img :src="song.imageUrl" :alt="song.songName" />
        <div class="song-content">
            <h1>{{ song.songName }}</h1>
            <p>
                {{ song.author.name }} | {{ songLength }}
                {{ additionalInfo ? "| " + additionalInfo : "" }}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { Song } from "@/spotifyApi/interfaces/song";

import { defineComponent } from "vue";

export default defineComponent({
    props: {
        song: {
            type: Object as () => Song,
            required: true,
        },
        additionalInfo: {
            type: String,
            required: false,
        },
    },
    computed: {
        songLength() {
            let minutes = Math.floor(this.$props.song.duration / 60000);
            let seconds = parseInt(
                ((this.$props.song.duration % 60000) / 1000).toFixed(0)
            );
            return seconds == 60
                ? minutes + 1 + ":00"
                : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        },
    },
});
</script>


<style lang="scss" scoped>
div.song {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-items: center;

    border-radius: $border-radius;

    background-color: $content-color;

    height: 70px;
    max-width: 600px;

    padding: 0.65em;

    img:first-child {
        border-radius: 5px;
    }

    div.song-content {
        padding-left: 1em;
        h1 {
            font-size: large;
            margin: 0;
        }

        p {
            font-size: small;
            margin: 0;
            color: $paragraph-color;
        }
    }
}
</style>