<template>
    <div class="filter">
        {{ filter.toString() }}
        <i class="fas fa-xmark" @click="deleteFilter"></i>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Filter } from "@/tools/filterTool/filter";

export default defineComponent({
    emits: ["deleteFilter"],
    props: {
        filter: {
            type: Object as () => Filter,
            required: true,
        },
    },
    methods: {
        deleteFilter() {
            this.$emit("deleteFilter", this.$props.filter);
        },
    },
});
</script>

<style lang="scss" scoped>
div.filter {
    padding: 0.5rem 1rem;
    background-color: $content-color;

    padding-left: 1rem;

    border-radius: $border-radius;

    i {
        margin-left: 0.5rem;
        color: $main-color;
        cursor: pointer;
    }
}
</style>