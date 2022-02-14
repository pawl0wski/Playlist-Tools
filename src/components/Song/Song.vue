<template>
    <div class="song">
        <img :src="song.imageUrl" :alt="song.songName" />
        <div class="song-content">
            <h1>{{ song.songName }}</h1>
            <p>
                {{ song.author.name }} | {{ songLength }}
                {{ additionalInfo ? "| " + additionalInfo : "" }}
            </p>
            <p>
                <a
                    class="play-on-spotify"
                    target="_blank"
                    :href="'https://open.spotify.com/track/' + song.id"
                >
                    <img src="../../assets/spotify.png" alt="Spotify logo" />
                </a>
            </p>
        </div>
        <div class="song-play" @click="toggleSong" v-if="song.previewUrl">
            <i v-if="!playing" class="fas fa-play"></i>
            <i v-if="playing" class="fas fa-stop"></i>
        </div>
    </div>
</template>

<script lang="ts">
import { Song } from "@/spotifyApi/interfaces/song";

import { defineComponent } from "vue";

export default defineComponent({
    data(): { playing: boolean; audioObject: HTMLAudioElement | undefined } {
        return {
            playing: false,
            audioObject: undefined,
        };
    },
    props: {
        song: {
            type: Object as () => Song,
            required: true,
        },
        additionalInfo: {
            type: String,
            required: false,
            default: "",
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
    methods: {
        toggleSong() {
            if (this.$data.playing) {
                this.$data.audioObject?.pause();
                this.$data.playing = false;
            } else {
                this.$data.audioObject = new Audio(this.$props.song.previewUrl);
                this.$data.audioObject.volume = 0.5;
                this.$data.audioObject.play();
                this.$data.audioObject.addEventListener("ended", () => {
                    this.$data.playing = false;
                });
                this.$data.playing = true;
            }
        },
    },
    beforeUnmount() {
        if (this.$data.audioObject) {
            this.$data.audioObject.pause();
        }
    },
});
</script>


<style lang="scss" scoped>
div.song {
    display: flex;
    flex-direction: row;
    align-items: center;

    border-radius: $border-radius;

    background-color: $content-color;

    width: min(600px, 98vw);

    padding: 0.65em 1em;

    img:first-child {
        height: 100%;
        max-height: 60px;
        width: auto;
    }

    div.song-content {
        padding-left: 1em;
        width: 100%;
        h1 {
            font-size: large;
            margin: 0;
            text-overflow: ellipsis;
            word-wrap: normal;
        }

        p {
            font-size: small;
            margin: 0;
            color: $paragraph-color;
            overflow: hidden;
            height: 1.5em;

            &:last-of-type {
                margin-top: 0.2rem;
            }
        }

        a.play-on-spotify {
            text-decoration: none;
            color: $main-color;

            i:first-child {
                font-size: 1.25rem;
                color: $main-color;
            }
        }
    }

    div.song-play {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 1rem;
        cursor: pointer;

        i {
            color: $main-color;
            font-size: 1.25rem;
        }
    }
}
</style>