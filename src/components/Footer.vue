<template>
    <footer>
        <a :href="link">{{content}}</a>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            link: "https://github.com/Jeboczek/Spotify-Tools",
            content: "View code on Github",
        }    
    }
}
</script>

<style lang="scss" scoped>
    footer{
        text-align: center;
        width: 100%;
        margin-top: 150px;
        padding: 1em 0px;
        background-color: $content-color;
    }
</style>