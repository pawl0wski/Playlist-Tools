<template>
    <div class="search-bar">
        <input
            type="text"
            @input="handleInput"
            v-model="content"
            placeholder="Search your playlist here..."
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    data() {
        return {
            content: "",
        };
    },
    emits: ["changeSearchValue"],
    methods: {
        handleInput(e: InputEvent) {
            this.$emit("changeSearchValue", this.$data.content);
        },
    },
});
</script>

<style lang="scss" scoped>
div.search-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 2em;
}
</style>