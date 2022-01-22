<template>
    <div class="user-info">
        <div class="avatar-circle" :style="{backgroundImage: 'url(' + avatarUrl + ')'}"></div>
        {{username}}
        <i id="logout" @click="$emit('logOut')" class="fas fa-sign-out-alt"></i>
    </div>
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
</style>