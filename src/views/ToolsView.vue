<template>
    <UserHeader :avatarUrl="avatarUrl" :username="username" />
    <h2>Select <span class="main-color">tool</span> to continue.</h2>
    <div class="tools-wrapper">
        <Tool
            icon="fas fa-broom"
            title="Remove <span class='main-color'>duplications</span>."
            description="Remove duplicated songs in your playlist."
        />
        <Tool
            icon="fas fa-filter"
            title="Remove songs by <span class='main-color'>filter</span>."
            description="Remove duplicated songs in your playlist."
        />
        <Tool
            icon="fas fa-broom"
            title="Remove <span class='main-color'>intros</span>."
            description="Remove duplicated songs in your playlist."
        />
        <router-link
            class="router-link"
            :to="{
                name: 'CopyPlaylistTool',
            }"
        >
            <Tool
                icon="fas fa-copy"
                title="<span class='main-color'>Copy</span> playlist."
                description="Remove duplicated songs in your playlist."
            />
        </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserHeader from "@/components/UserHeader.vue";
import Tool from "@/components/ToolsView/Tool.vue";
import { SpotifyApiFactory } from "@/spotifyApi/spotifyApiFactory";

export default defineComponent({
    components: {
        UserHeader,
        Tool,
    },
    data() {
        return {
            username: "",
            avatarUrl: "",
        };
    },
    // Check if user is authenticated if not redirect his to HomeView
    async beforeCreate() {
        let spotify = SpotifyApiFactory.createCachedSpotifyApiWithDefaultApp();
        this.$data.username = await spotify.getUsername();
        this.$data.avatarUrl = await spotify.getAvatarUrl();
    },
});
</script>

<style lang="scss" scoped>
a.router-link {
    text-decoration: none;
}

h2:first-of-type {
    text-align: center;
}

div.tools-wrapper {
    margin-top: 4em;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 2em;

    flex-wrap: wrap;

    gap: 2em;
}
</style>