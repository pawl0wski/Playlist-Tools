<template>
  <div class="home">
    <Header></Header>
    <h2>What you can do with <span class="main-color">Spotify Tools</span>?</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from "@/components/Home/Header.vue";

export default defineComponent({
  name: 'Home',
  components: {
    Header
  }
});
</script>

<style lang="scss" scoped>
  div.home{
    text-align: center;

    h2 {
      &:first-of-type {
        margin-top: 2em;
      }
    }
  }
</style>
