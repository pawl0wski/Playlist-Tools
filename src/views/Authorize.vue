<template>
    <div class="authorize">
        <h2>Authorizing...</h2>
        <Spinner></Spinner>
    </div>
</template>

<script lang="ts">
import Spinner from "@/components/Spinner.vue";
export default {
    components: {
        Spinner
    }
}
</script>

<style lang="scss" scoped>
    div.authorize{
        text-align: center;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        h2{
            margin: 0;
            margin-bottom: 1em;
        }
    }
</style>