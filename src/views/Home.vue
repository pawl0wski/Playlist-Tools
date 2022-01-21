<template>
  <div class="home">
    <Header></Header>
    <h2>What you can do with <span class="main-color">Spotify Tools</span>?</h2>
    <div class="tools-wrapper">
      <ToolInfo title="Some tool" description="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " image="https://www.w3schools.com/css/paris.jpg" ></ToolInfo>
      <ToolInfo title="Some tool" description="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " image="https://www.w3schools.com/css/paris.jpg"></ToolInfo>
      <ToolInfo title="Some tool" description="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " image="https://www.w3schools.com/css/paris.jpg" ></ToolInfo>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from "@/components/Home/Header.vue";
import ToolInfo from "@/components/Home/ToolInfo.vue";
import Spinner from "@/components/Spinner.vue";

export default defineComponent({
  name: 'Home',
  components: {
    Header,
    ToolInfo,
  }
});
</script>

<style lang="scss" scoped>
  div.home{
    text-align: center;

    h2 {
      &:first-of-type {
        margin: 2em 0px;
      }
    }

    div.tools-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 5em;
    }

  }
</style>
