<template>
    <header>
        <div class="circled-avatar"></div>
        <h2>
            Hi, <span class="main-color">{{username}}</span>
        </h2>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        username: String, 
        avatarUrl: String,
    }
})
</script>

<style lang="scss" scoped>
    header {
        width: 100%;
        min-height: 300px;
        background-color: $content-color;

        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>