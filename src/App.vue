<template>
  <router-view/>
  <Footer></Footer>
</template>

<script lang="ts">
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Footer,
  }
}
</script>

<style lang="scss">
  *{
    color: white;
    font-family: 'RocknRoll One', sans-serif;
    box-sizing: border-box;
  }

  body{
    margin: 0;
    background-color: $bg-color;
  }

  span.main-color{
    color: $main-color
  }

</style>
