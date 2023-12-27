<script setup lang="ts">
interface Props {
  name: string,
  padding?: string,
  fontSize?: "xs" | "sm" | "base" | "lg" | "xl"
  lineHeight?: string,
  color?: string
}

withDefaults(defineProps<Props>(), {
  name: "",
  padding: "pt-0 pr-1 pb-0 pl-1",
  fontSize: "base",
  lineHeight: "leading-4"
})

</script>

<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"/>
  <span
    class="material-symbols-outlined align-bottom"
  >
    {{ name }}
  </span>
</template>

<style scoped>
span {
  vertical-align: bottom;
  font-size: v-bind(fontSize);
  padding: v-bind(padding);
  line-height: v-bind(lineHeight);
  color: v-bind(color);
}

</style>