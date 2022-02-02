<template>
    <a :href="repoUrl" target="_blank">
        <div class="repo">
            <h3>{{ title }}</h3>
            <p>{{ description ? description : "No description provided" }}</p>
        </div>
    </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        repoUrl: {
            type: String,
            required: true,
        },
    },
});
</script>


<style lang="scss" scoped>
a {
    text-decoration: none;
}

div.repo {
    max-width: 300px;
    background-color: $content-color;
    padding: 0.5em 1.5em;
    border-radius: $border-radius;

    transition: 0.2s background-color;

    h3 {
        color: $main-color;
    }

    &:hover {
        background-color: lighten($color: $content-color, $amount: 1);
    }
}
</style>