<template>
    <div class="filters-wrapper">
        <FilterComponent
            v-for="filter in filters"
            :key="filter"
            :filter="filter"
            @deleteFilter="deleteFilter"
        />

        <button id="filter-add" @click="addButtonClicked">ADD</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FilterComponent from "./Filter.vue";
import { Filter } from "@/tools/filterTool/filter";

export default defineComponent({
    emits: ["addClicked", "deleteFilter"],
    components: {
        FilterComponent,
    },
    props: {
        filters: {
            type: Object as () => Array<Filter>,
            required: true,
        },
    },
    methods: {
        addButtonClicked() {
            this.$emit("addClicked");
        },
        deleteFilter(filter: Filter) {
            this.$emit("deleteFilter", filter);
        },
    },
});
</script>

<style lang="scss" scoped>
div.filters-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.7rem;

    margin: 1rem 0rem;

    button#filter-add {
        padding: 0.5rem 1rem;
        background-color: $content-color;
        color: $main-color;

        &:hover {
            background-color: lighten($color: $content-color, $amount: 1.5);
        }
    }
}
</style>