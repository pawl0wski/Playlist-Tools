<template>
    <div
        class="selectable"
        @click="toggleSelect"
        :id="selected ? 'selected' : ''"
    >
        <i class="fas fa-check"></i>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        selectedOnStart: {
            type: Boolean,
            default: false,
        },
    },
    data(): { selected: Boolean } {
        return { selected: this.$props.selectedOnStart };
    },
    emits: ["selectChange"],
    methods: {
        toggleSelect() {
            this.$data.selected = !this.$data.selected;
            this.$emit("selectChange", this.$data.selected);
        },
    },
});
</script>


<style lang="scss" scoped>
div.selectable {
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    background-color: $content-color;
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    transition: 0.1s background-color;

    i {
        opacity: 0;
        transition: 0.1s opacity;
    }

    &#selected {
        background: $main-color-darker;

        i {
            opacity: 1;
        }
    }
}
</style>