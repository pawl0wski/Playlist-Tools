<template>
    <div class="playlist-select" v-if="!playlistToPurge">
        <UserHeader />
        <h2>
            Select <span class="main-color">playlist</span> to purge from
            intros.
        </h2>
        <PlaylistPicker
            :onlyMyPlaylists="true"
            @playlistSelected="onPlaylistSelect"
        />
    </div>
    <div class="intro-remover" v-if="playlistToPurge">
        <PlaylistHeader :playlist="playlistToPurge" />
        <h2 v-if="!loading && isAnyIntros">
            <span class="main-color">Intros</span> to remove.
        </h2>
        <button
            v-if="!loading && isAnyIntros"
            :disabled="buttonDisabled ? 1 : 0"
            @click="deleteIntrosClicked"
        >
            Remove intros
        </button>
        <div class="spinner-wrapper" v-if="loading">
            <Spinner />
            <p>Getting songs from Spotify...</p>
        </div>
        <div class="songs" v-if="!loading && isAnyIntros">
            <div class="song-component" :key="intro" v-for="intro in getIntros">
                <SongCheckbox
                    :selectedOnStart="true"
                    @selectChange="
                        (newSelection) => {
                            onSongSelectionChanged(intro, newSelection);
                        }
                    "
                />
                <SongComponent :song="intro" />
            </div>
        </div>
        <div class="no-intros" v-if="!isAnyIntros && !loading">
            <i class="fas fa-trophy"></i>
            <h3>Hooray!</h3>
            <p>This playlist don't have any intros</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import UserHeader from "@/components/UserHeader.vue";
import PlaylistPicker from "@/components/PlaylistSelector/PlaylistPicker.vue";
import PlaylistHeader from "@/components/PlaylistHeader.vue";
import SongComponent from "@/components/Song/Song.vue";
import SongCheckbox from "@/components/Song/SongCheckbox.vue";
import Spinner from "@/components/Spinner.vue";

import { SpotifyApiFactory } from "@/spotifyApi/spotifyApiFactory";
import { Playlist } from "@/spotifyApi/interfaces/playlist";
import { Song } from "@/spotifyApi/interfaces/song";
import { IntroRemoverTool } from "@/tools/introRemoverTool/introRemoverTool";
import Swal from "sweetalert2";

export default defineComponent({
    components: {
        UserHeader,
        PlaylistPicker,
        PlaylistHeader,
        SongComponent,
        SongCheckbox,
        Spinner,
    },
    data(): {
        playlistToPurge?: Playlist;
        introRemoverTool?: IntroRemoverTool;
        loading: boolean;
        isAnyIntros: boolean;
        buttonDisabled: boolean;
    } {
        return {
            playlistToPurge: undefined,
            introRemoverTool: undefined,
            loading: false,
            isAnyIntros: false,
            buttonDisabled: false,
        };
    },
    methods: {
        async onPlaylistSelect(playlist: Playlist) {
            this.$data.loading = true;
            this.$data.playlistToPurge = playlist;
            let spotifyApi =
                SpotifyApiFactory.createCachedSpotifyApiWithDefaultApp();
            this.$data.introRemoverTool = new IntroRemoverTool(
                playlist,
                spotifyApi
            );
            await this.$data.introRemoverTool!.getSongsFromPlaylist();
            this.$data.isAnyIntros =
                !!this.$data.introRemoverTool!.getIntros().length;
            this.$data.loading = false;
        },
        async deleteIntrosClicked() {
            this.$data.buttonDisabled = true;
            await this.$data.introRemoverTool?.doWork();
            await this.onPlaylistSelect(this.$data.playlistToPurge!);
            this.$data.buttonDisabled = false;
            Swal.mixin({
                toast: true,
                position: "bottom-end",
                timer: 5000,
                timerProgressBar: true,
                showConfirmButton: false,
                background: "#08262D",
                color: "white",
            }).fire({
                icon: "success",
                title: "Intros removed.",
            });
        },
        onSongSelectionChanged(song: Song, newSelection: boolean) {
            if (newSelection) {
                this.$data.introRemoverTool?.restoreExcludedSong(song);
            } else {
                this.$data.introRemoverTool?.addExcludedSong(song);
            }
        },
    },
    computed: {
        getIntros(): Array<Song> {
            if (this.$data.introRemoverTool) {
                console.log(this.$data.introRemoverTool!.getIntros());
                return this.$data.introRemoverTool!.getIntros();
            } else {
                return [];
            }
        },
    },
});
</script>


<style lang="scss" scoped>
h2 {
    text-align: center;
    margin-bottom: 2em;
}

div.spinner-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 5em;
}

div.songs {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5em;
}

div.intro-remover {
    display: flex;
    align-items: center;
    flex-direction: column;
}

button {
    margin-bottom: 1em;
}

div.no-intros {
    text-align: center;
    width: 15em;

    margin-top: 200px;

    i:first-child {
        font-size: 52px;
        color: $main-color;
    }

    h3 {
        margin: 0;
        margin-top: 1em;
    }

    p {
        color: $paragraph-color;
        margin: 0;
    }
}

div.song-component {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: min(calc(600px + 2rem + 1rem), 98vw);

    gap: 1rem;
}
</style>