<template>
  <div id="view">
    <router-view/>
  </div>
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

  div#view{
    min-height: calc(100vh - 60px);
    padding-bottom: 150px;
  }

  span.main-color{
    color: $main-color
  }

</style>
