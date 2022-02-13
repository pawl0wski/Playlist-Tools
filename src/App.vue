<template>
    <NavgiationBar ref="navigationBar"></NavgiationBar>
    <div id="view">
        <router-view
            @newAuthorized="$refs.navigationBar.reload()"
        ></router-view>
    </div>
    <Footer></Footer>
</template>

<script lang="ts">
import Footer from "@/components/Footer.vue";
import NavgiationBar from "@/components/NavigationBar/NavigationBar.vue";

export default {
    components: {
        Footer,
        NavgiationBar,
    },
};
</script>

<style lang="scss">
* {
    color: white;
    font-family: "RocknRoll One", sans-serif;
    box-sizing: border-box;
}

body {
    margin: 0;
    background-color: $bg-color;
}

div#view {
    min-height: calc(100vh - 60px);
    padding-bottom: 150px;
}

span.main-color {
    color: $main-color;
}

input[type="text"] {
    height: 3em;
    width: 30em;
    background-color: $content-color;
    border-style: none;
    border-color: $main-color-darker !important;
    border-width: 2px !important;
    border-radius: $border-radius !important;

    padding: 1em;
    font-size: medium;
}

button {
    background-color: $main-color-darker;
    border-radius: $border-radius;
    border-style: none;
    padding: 0.5em 2em;
    font-size: medium;

    transition: 0.2s background-color;

    cursor: pointer;

    &:hover {
        background-color: $main-color;
    }

    &:disabled {
        background-color: $content-color;

        color: $paragraph-color;
        cursor: wait;
    }
}

div.swal2-range {
    background-color: $content-color !important;
}

input.swal2-input {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    background-color: lighten($color: $content-color, $amount: 2);

    &:focus {
        outline: none;
    }
}
</style>
