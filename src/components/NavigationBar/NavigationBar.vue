<template>
  <nav>
      <router-link to="/">
          <h3>{{name}}</h3>
      </router-link>
      <NavigationContent v-if="!burgerMode"></NavigationContent>
      <NavigationUser :avatarUrl="avatarUrl" :username="username" v-if="isAuthorized && !burgerMode" @logOut="logOut"></NavigationUser>
  </nav>
</template>

<script lang="ts">
import { SpotifyCreator } from "@/libs/spotify_connector/spotify_creator";
import NavigationUser from "@/components/NavigationBar/NavigationUser.vue";
import NavigationContent from "@/components/NavigationBar/NavigationContent.vue";
import { defineComponent } from "vue";
export default defineComponent ({
    data() {
        return {
            name: "Spotify Tools",
            avatarUrl: "",
            username: "",
            isAuthorized: false,
            burgerMode: false,
        }
    },
    components: {
        NavigationUser,
        NavigationContent
    },
    methods: {
        logOut() {
            let spotify = SpotifyCreator.createSpotifyWithDefaultApp()
            spotify.logOut()
            this.$router.go(0)
        },
        reload () {
            this.updateSpotifyData()
        },
        updateSpotifyData() {
            let spotify = SpotifyCreator.createSpotifyWithDefaultApp()
            let isAuthorized = spotify.isAuthorized()
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
        window.addEventListener("resize", () => {
            console.log("Resize!")
            this.$data.burgerMode = window.innerWidth < 570;
            console.log(this.$data.burgerMode)
        })
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

        gap: 2em;

        a{
            text-decoration: none;
            h3{
                margin: 0;
            }
        }
    }
</style>