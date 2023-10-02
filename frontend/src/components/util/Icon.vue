<script setup lang="ts">
import {computed} from "vue"

interface Props {
  imageName: string,
  fileExtension?: string
}

const props = withDefaults(defineProps<Props>(), {
  imageName: "",
  fileExtension: "svg",
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
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
}

img:hover {
  opacity: 80%;
}

</style>