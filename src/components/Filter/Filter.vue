<template>
    <div class="filter">
        {{ filter.toString() }}
        <i class="fa-solid fa-xmark"></i>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Filter } from "@/tools/filterTool/filter";

export default defineComponent({
    props: {
        filter: {
            type: Object as () => Filter,
            required: true,
        },
    },
});
</script>

<style lang="scss" scoped>
div.filter {
    padding: 1rem 0.5rem;
    background-color: $content-color;
}
</style>