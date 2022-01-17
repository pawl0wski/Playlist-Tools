<template>
  <div class="home">
    <Header></Header>
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

  }
</style>
