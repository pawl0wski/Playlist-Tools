<template>
    <div class="toolview-tool">
        <div class="tool-icon">
            <i :class="icon"> </i>
        </div>
        <h3 v-html="title"></h3>
        <p>
            {{ description }}
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        title: String,
        description: String,
        icon: String,
    },
});
</script>

<style lang="scss" scoped>
div.toolview-tool {
    background-color: $content-color;
    width: 250px;
    height: 300px;
    padding: 2em;

    border-radius: $border-radius;

    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;

    cursor: pointer;

    transition: 0.1s background-color;

    user-select: none;

    div.tool-icon {
        width: 4em;
        height: 4em;

        border-radius: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        i {
            font-size: 2em;
        }

        background-color: $main-color-darker;
    }

    p {
        opacity: 0.66;
    }

    &:hover {
        background-color: lighten($color: $content-color, $amount: 0.7);
    }
}
</style>