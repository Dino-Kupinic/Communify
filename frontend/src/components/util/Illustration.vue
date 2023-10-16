<script setup lang="ts">
import {computed} from "vue"

interface Props {
  imageName: string,
  fileExtension?: string,
  pictureHeight: string,
  pictureWidth: string,
}

const props = withDefaults(defineProps<Props>(), {
  imageName: "",
  fileExtension: "svg",
  pictureHeight: "20rem",
  pictureWidth: "20rem",
})

const imgSrc = computed(() => {
  return new URL(`../../assets/img/${props.imageName}.${props.fileExtension}`, import.meta.url).href
})
</script>

<template>
  <div>
    <img :src="imgSrc" alt="Icon">
    <slot></slot>
  </div>
</template>

<style scoped>

img {
  width: v-bind(pictureWidth);
  height: v-bind(pictureHeight);
  padding: 0;
}
</style>