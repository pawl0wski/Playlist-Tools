<template>
    <div class="home">
        <Header></Header>
        <h2>
            What you can do with <span class="main-color">Spotify Tools</span>?
        </h2>
        <div class="tools-wrapper">
            <ToolInfo
                title="Filter your playlists"
                description="You want only your favorite artist's songs in your playlist, or you want to keep only energetic songs. Use this tool to easily filter your playlist."
                image="https://www.w3schools.com/css/paris.jpg"
                itemName="FilterRemoverTool"
            ></ToolInfo>
            <ToolInfo
                title="Delete duplications"
                description="Accidentally added two of the same songs to a playlist? Instead of looking for duplicates yourself, use this tool."
                image="https://www.w3schools.com/css/paris.jpg"
                itemName="DuplicationRemoverTool"
            ></ToolInfo>
            <ToolInfo
                title="Remove intros"
                description="Have you added all the songs from the album and sometimes you get the album intros playing? Clean your playlist with this tool."
                image="https://www.w3schools.com/css/paris.jpg"
                itemName="IntroRemoverTool"
            ></ToolInfo>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/HomeView/Header.vue";
import ToolInfo from "@/components/HomeView/ToolInfo.vue";

import Swal from "sweetalert2";

export default defineComponent({
    name: "Home",
    props: {
        // Set this after new authorization. If it is true, Home will show info about successful login.
        newAuthorized: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        Header,
        ToolInfo,
    },
    mounted() {
        if (this.newAuthorized) {
            this.$emit("newAuthorized");
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
                title: "Signed in.",
            });
        }
    },
});
</script>

<style lang="scss" scoped>
div.home {
    text-align: center;

    h2 {
        &:first-of-type {
            margin: 2em 0px;
        }
    }

    div.tools-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 5em;
    }
}
</style>
