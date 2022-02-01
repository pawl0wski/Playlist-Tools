<template>
    <UserHeader />
    <div class="playlist-selector">
        <h2>Select <span class="main-color">playlist</span> to copy.</h2>
        <PlaylistPicker
            @playlistSelected="onPlaylistSelect"
            :refreshCaller="refreshCaller"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { CopyTool } from "@/tools/copyTool/copyTool";

import UserHeader from "@/components/UserHeader.vue";
import PlaylistPicker from "@/components/PlaylistSelector/PlaylistPicker.vue";
import { Playlist } from "@/spotifyApi/interfaces/playlist";
import { SpotifyApiFactory } from "@/spotifyApi/spotifyApiFactory";
import Swal from "sweetalert2";

export default defineComponent({
    components: {
        UserHeader,
        PlaylistPicker,
    },
    data(): {
        playlistToCopy?: Playlist;
        newPlaylistName?: string;
        refreshCaller: boolean;
    } {
        return {
            playlistToCopy: undefined,
            newPlaylistName: undefined,
            refreshCaller: false,
        };
    },
    methods: {
        onPlaylistSelect(selectedPlaylist: Playlist) {
            Swal.fire({
                title: '<h5>Provide <span class="main-color">name</span> of your new playlist</h5>',
                input: "text",
                inputAttributes: {
                    autocapitalize: "off",
                },
                showCancelButton: true,
                confirmButtonText: "Copy",
                showLoaderOnConfirm: true,
                background: "#08262D",
                color: "white",
                confirmButtonColor: "#14CC60",
                cancelButtonColor: "#05181D",
                preConfirm: async (playlistName: string) => {
                    let spotify =
                        SpotifyApiFactory.createCachedSpotifyApiWithDefaultApp();
                    let copyTool = new CopyTool(
                        selectedPlaylist,
                        spotify,
                        playlistName
                    );
                    try {
                        await copyTool.doWork();
                    } catch (error) {
                        Swal.fire({
                            title: "Something went wrong.",
                            text: "Sorry but we can't copy this playlist.",
                            icon: "error",
                            background: "#08262D",
                            color: "white",
                            confirmButtonColor: "#14CC60",
                            confirmButtonText: "Ok",
                        });
                        return;
                    }

                    let newPlaylist = copyTool.getNewPlaylist();
                    Swal.fire({
                        title: "Your copy of <span class='main-color'>playlist</span> is ready.",
                        html: `<div class="playlist">
                                <div style="background-image: url('${selectedPlaylist.imageUrl}')" class="dialog-playlist-cover"> </div>
                                <h3>${newPlaylist.name}</h3>
                                <a href="https://open.spotify.com/playlist/${newPlaylist.id}" style="color: #27FB6B; text-decoration: none;" target="_blank">Open in Spotify<a/>
                            </div>`,
                        background: "#08262D",
                        confirmButtonColor: "#14CC60",
                        color: "white",
                    });
                    this.refreshCaller = !this.refreshCaller;
                },
                allowOutsideClick: () => !Swal.isLoading,
            });
        },
    },
});
</script>

<style lang="scss">
div.playlist-selector {
    text-align: center;
}
div.dialog-playlist-cover {
    width: 250px;
    height: 250px;
    background-size: cover;
    background-position: center;
    margin-left: auto;
    margin-right: auto;
}
</style>