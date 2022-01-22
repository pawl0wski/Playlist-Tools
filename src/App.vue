<template>
  <NavgiationBar ref="navigationBar"></NavgiationBar>
  <div id="view">
    <router-view @new-authorized="$refs.navigationBar.reload()"></router-view>
  </div>
  <Footer></Footer>
</template>

<script lang="ts">
import Footer from "@/components/Footer.vue";
import NavgiationBar from "@/components/NavigationBar.vue";

export default {
  components: {
    Footer,
    NavgiationBar
  },
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
