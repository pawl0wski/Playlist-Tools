<template>
  <div class="tool-info" :style="[reversed ? {'flex-direction': 'row-reverse'} : {'flex-direction': 'row'}]">
      <div class="tool-info-image">
          <img class="ornament" src="../../assets/ornament.svg" alt="">
          <img class="tool-image" :src="image" :alt="title">
          <img class="ornament" src="../../assets/ornament.svg" alt="">
      </div>
      <div class="tool-info-text">
          <h2>{{title}}</h2>
          <p>{{description}}</p>
      </div>
  </div>
</template>

<script lang="ts">
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        reversed: {
            type: Boolean,
            default: false,
        }
    },
    data() {
    }
}
</script>

<style lang="scss" scoped>
    div.tool-info {

        width: 60%;

        min-height: 380px;

        display: flex;
        flex-wrap: wrap;
        flex-direction: row;

        align-items: center;
        justify-content: center;

        &-image {
            width: 35%;
            min-width: 350px;
            height: 400px;

            display: flex;
            justify-content: center;
            align-items: center;

            img.tool-image {
                width: 70%;
                height: 90%;
                object-fit: fill;
                border-radius: $border-radius;
            }

            img.ornament {

                width: 19%;
                position: relative;

                &:first-of-type {
                    top: -50%;
                    transform: translate(50%, 50%);
                }

                &:last-of-type {
                    bottom: -50%;
                    transform: translate(-50%, -50%);
                }
            }
        }

        &-text {
            width: 50%;

            display: flex;
            flex-direction: column;
            align-items: center;

            p {
                opacity: 0.66;
                width: 50%;
                min-width: 200px;
            }
        }
    }
</style>