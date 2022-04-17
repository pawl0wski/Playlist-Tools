<template>
    <footer>
        <a :href="link">{{ content }}</a>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            link: "https://github.com/jpawlowskii/Spotify-Tools",
            content: "View code on Github",
        };
    },
};
</script>

<style lang="scss" scoped>
footer {
    height: 60px;
    text-align: center;
    width: 100%;
    padding: 1em 0px;
    background-color: $content-color;
}
</style>