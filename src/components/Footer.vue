<template>
    <footer>
        <a :href="link">{{ content }}</a>
        <span id="app-version">{{ gitHash }}</span>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            link: "https://github.com/pawl0wski/Playlist-Tools",
            content: "View code on Github",
            gitHash: process.env.VUE_APP_GIT_HASH
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
    display: flex;
    flex-direction: column;

    span#app-version {
        color: transparentize(#FFF, 0.5);
        font-size: 0.7rem;
    }
}
</style>