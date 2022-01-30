<template>
    <header>
        <div
            class="circled-avatar"
            :style="{ backgroundImage: 'url(' + avatarUrl + ')' }"
        ></div>
        <h2>
            Hi, <span class="main-color">{{ username }}</span>
        </h2>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        username: String,
        avatarUrl: String,
    },
});
</script>

<style lang="scss" scoped>
header {
    width: 100%;
    min-height: 300px;
    background-color: $content-color;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    div.circled-avatar {
        width: 125px;
        height: 125px;
        background-position: center;
        background-size: cover;
        border-radius: 100%;
    }
}
</style>