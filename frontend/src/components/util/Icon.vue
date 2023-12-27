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
    <img class="flex w-6 h-6 p-0 hover:opacity-80" :src="imgSrc" alt="Icon">
    <slot></slot>
  </div>
</template>
