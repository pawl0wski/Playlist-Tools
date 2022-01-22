<template>
  <nav>
      <h3>{{name}}</h3>
      <div class="user-info" v-if="isAuthorized">
        <div class="avatar-circle" :style="{backgroundImage: 'url(' + avatarUrl + ')'}"></div>
        {{username}}
        <i id="logout" @click="logOut" class="fas fa-sign-out-alt"></i>
      </div>
  </nav>
</template>

<script lang="ts">
import { SpotifyCreator } from "@/libs/spotify_connector/spotify_creator";
import { defineComponent } from "vue";
export default defineComponent ({
    data() {
        return {
            name: "Spotify Tools",
            avatarUrl: "",
            username: "",
            isAuthorized: false,
        }
    },
    methods: {
        logOut() {
            let spotify = SpotifyCreator.createSpotifyWithDefaultApp()
            spotify.logOut()
            window.location.reload()
        },
        reload () {
            this.updateSpotifyData()
        },
        updateSpotifyData() {
            let spotify = SpotifyCreator.createSpotifyWithDefaultApp()
            let isAuthorized = spotify.isAuthorized()
            console.log(isAuthorized);
            if (isAuthorized) {
                this.$data.isAuthorized = isAuthorized;
                spotify.getAvatarUrl().then((avatarUrl) => {
                    this.$data.avatarUrl = avatarUrl;
                })
                spotify.getUsername().then((username) => {
                    this.$data.username = username;
                });
            }
        }
    },
    beforeMount() {
        this.updateSpotifyData()
    },
})
</script>

<style lang="scss" scoped>
    nav{
        position: sticky;
        top: 0;
        height: 60px;
        background-color: darken($color: $bg-color, $amount: 0.2);

        display: flex;
        align-items: center;
        justify-content: left;

        padding: 0px 1em;

        h3{
            margin: 0
        }

        div.user-info {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.8em;
            margin-left: auto;

            div.avatar-circle {
                width: 40px;
                height: 40px;
                background-position: center;
                background-size: cover;
                border-radius: 100%;
            }

            i#logout{
                cursor: pointer;
            }
        }


    }
</style>