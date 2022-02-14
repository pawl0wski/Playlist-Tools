<template>
    <div class="playlist-select" v-if="!playlistToPurge">
        <UserHeader />
        <h2>
            Select <span class="main-color">playlist</span> to purge from
            duplications.
        </h2>
        <PlaylistPicker
            :onlyMyPlaylists="true"
            @playlistSelected="onPlaylistSelect"
        />
    </div>
    <div class="duplication-remover" v-if="playlistToPurge">
        <PlaylistHeader :playlist="playlistToPurge" />
        <h2 v-if="!loading && isAnyDuplication">
            <span class="main-color">Duplications</span> to remove.
        </h2>
        <button
            v-if="!loading && isAnyDuplication"
            :disabled="buttonDisabled ? 1 : 0"
            @click="deleteDuplicationsClicked"
        >
            Remove duplications
        </button>
        <div class="spinner-wrapper" v-if="loading">
            <Spinner />
            <p>Getting songs from Spotify...</p>
        </div>
        <div class="songs" v-if="!loading && isAnyDuplication">
            <SongComponent
                :key="duplication"
                v-for="duplication in getDuplications"
                :song="duplication.song"
                :additionalInfo="
                    duplication.howMuchDuplications + ' duplications'
                "
            />
        </div>
        <div class="no-duplications" v-if="!isAnyDuplication && !loading">
            <i class="fas fa-trophy"></i>
            <h3>Hooray!</h3>
            <p>This playlist don't have any duplications</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import UserHeader from "@/components/UserHeader.vue";
import PlaylistPicker from "@/components/PlaylistSelector/PlaylistPicker.vue";
import PlaylistHeader from "@/components/PlaylistHeader.vue";
import SongComponent from "@/components/Song/Song.vue";
import Spinner from "@/components/Spinner.vue";

import { SpotifyApiFactory } from "@/spotifyApi/spotifyApiFactory";
import { Playlist } from "@/spotifyApi/interfaces/playlist";
import { Song } from "@/spotifyApi/interfaces/song";
import { DuplicationRemoverTool } from "@/tools/duplicationRemoverTool/duplicationRemoverTool";
import Swal from "sweetalert2";

export default defineComponent({
    components: {
        UserHeader,
        PlaylistPicker,
        PlaylistHeader,
        SongComponent,
        Spinner,
    },
    data(): {
        playlistToPurge?: Playlist;
        duplicationRemoverTool?: DuplicationRemoverTool;
        loading: boolean;
        isAnyDuplication: boolean;
        buttonDisabled: boolean;
    } {
        return {
            playlistToPurge: undefined,
            duplicationRemoverTool: undefined,
            loading: false,
            isAnyDuplication: false,
            buttonDisabled: false,
        };
    },
    methods: {
        async onPlaylistSelect(playlist: Playlist) {
            this.$data.loading = true;
            this.$data.playlistToPurge = playlist;
            let spotifyApi =
                SpotifyApiFactory.createCachedSpotifyApiWithDefaultApp();
            this.$data.duplicationRemoverTool = new DuplicationRemoverTool(
                playlist,
                spotifyApi
            );
            await this.$data.duplicationRemoverTool.getSongsFromPlaylist();
            this.$data.isAnyDuplication =
                !!this.$data.duplicationRemoverTool.getDuplications().length;
            this.$data.loading = false;
        },
        async deleteDuplicationsClicked() {
            this.$data.buttonDisabled = true;
            await this.$data.duplicationRemoverTool?.doWork();
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
                title: "Duplications removed.",
            });
        },
    },
    computed: {
        getDuplications(): Array<{ song: Song; howMuchDuplications: number }> {
            if (this.$data.duplicationRemoverTool) {
                let duplications: Array<{ songs: Array<Song> }> =
                    this.$data.duplicationRemoverTool.getDuplications()!;
                let duplicationsToShow: Array<{
                    song: Song;
                    howMuchDuplications: number;
                }> = duplications.map((e: { songs: Array<Song> }) => {
                    return {
                        song: e.songs[0],
                        howMuchDuplications: e.songs.length,
                    };
                });
                return duplicationsToShow;
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

div.duplication-remover {
    display: flex;
    align-items: center;
    flex-direction: column;
}

button {
    margin-bottom: 1em;
}

div.no-duplications {
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
</style>