<template>
    <nav>
        <router-link to="/">
            <h3>{{ name }}</h3>
        </router-link>
        <NavigationContent v-if="!burgerMode"></NavigationContent>
        <NavigationUser
            :avatarUrl="avatarUrl"
            :username="username"
            v-if="isAuthorized && !burgerMode"
            @logOut="logOut"
        ></NavigationUser>
        <NavigationBurgerBtn
            v-if="burgerMode"
            @click="toggleBurgerMenu"
            :isOn="burgerMenuShowed"
        ></NavigationBurgerBtn>
    </nav>
    <div
        class="burger-menu"
        :style="{ top: burgerMenuShowed ? '60px' : '-100px' }"
        v-if="burgerMode"
    >
        <NavigationContent></NavigationContent>
        <NavigationUser
            :avatarUrl="avatarUrl"
            :username="username"
            v-if="isAuthorized"
            @logOut="logOut"
        ></NavigationUser>
    </div>
</template>

<script lang="ts">
import { SpotifyApiFactory } from "@/spotifyApi/spotifyApiFactory";
import NavigationUser from "@/components/NavigationBar/NavigationUser.vue";
import NavigationContent from "@/components/NavigationBar/NavigationContent.vue";
import NavigationBurgerBtn from "@/components/NavigationBar/NavigationBurgerBtn.vue";
import { defineComponent } from "vue";
export default defineComponent({
    data() {
        return {
            name: "Spotify Tools",
            avatarUrl: "",
            username: "",
            isAuthorized: false,
            burgerMode: false,
            burgerMenuShowed: false,
        };
    },
    components: {
        NavigationUser,
        NavigationContent,
        NavigationBurgerBtn,
    },
    methods: {
        logOut() {
            let spotify =
                SpotifyApiFactory.createCachedSpotifyApiWithDefaultApp();
            spotify.logOut();
            this.$router.go(0);
        },
        reload() {
            this.updateSpotifyData();
        },
        updateSpotifyData() {
            let spotify =
                SpotifyApiFactory.createCachedSpotifyApiWithDefaultApp();
            let isAuthorized = spotify.isAuthorized();
            if (isAuthorized) {
                this.$data.isAuthorized = isAuthorized;
                spotify.getAvatarUrl().then((avatarUrl) => {
                    this.$data.avatarUrl = avatarUrl;
                });
                spotify.getUsername().then((username) => {
                    this.$data.username = username;
                });
            }
        },
        updateBurgerMode() {
            this.$data.burgerMode = window.innerWidth < 570;
        },
        toggleBurgerMenu() {
            this.$data.burgerMenuShowed = !this.$data.burgerMenuShowed;
        },
    },
    beforeMount() {
        this.updateSpotifyData();
        this.updateBurgerMode();
        window.addEventListener("resize", this.updateBurgerMode);
    },
});
</script>

<style lang="scss" scoped>
nav {
    position: sticky;
    z-index: 50;
    top: 0;
    height: 60px;
    background-color: darken($color: $bg-color, $amount: 0.2);

    display: flex;
    align-items: center;
    justify-content: left;

    padding-left: 1em;

    gap: 2em;

    a {
        text-decoration: none;
        h3 {
            margin: 0;
        }
    }

    &::after {
        content: "";
        display: block;
        height: 60px;
    }
}

div.burger-menu {
    position: fixed;
    top: -125%;
    transition: 0.25s top;
    width: 100vw;
    background-color: $bg-color;
    z-index: 49;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 1em;

    padding-bottom: 1em;

    div.user-info {
        margin: unset;
    }
}
</style>