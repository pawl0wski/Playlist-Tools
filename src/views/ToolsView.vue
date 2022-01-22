<template>
    <Header>

    </Header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/ToolsView/Header.vue';
import { SpotifyCreator } from '@/libs/spotify_connector/spotify_creator';
import Swal from 'sweetalert2'

export default defineComponent({
    components: {
        Header
    },
    // Check if user is authenticated if not redirect his to Home
    beforeCreate() {
        let spotify = SpotifyCreator.createSpotifyWithDefaultApp()
        if(!spotify.isAuthorized()) {
            Swal.mixin({
                toast: true,
                position: "bottom-end",
                timer: 5000,
                timerProgressBar: true,
                showConfirmButton: false,
                background: "#08262D",
                color: "white",
            }).fire("Hold on!", "You need to authorize first!", "error")
            this.$router.replace("/")
        }
    }
})
</script>

<style lang="scss" scoped>

</style>