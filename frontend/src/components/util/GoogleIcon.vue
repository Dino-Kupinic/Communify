<script setup lang="ts">
interface Props {
  name: string,
  padding?: string,
  fontSize?: string,
  lineHeight?: string,
  color?: string
}

withDefaults(defineProps<Props>(), {
  name: "",
  padding: "0 5px 0 5px",
  fontSize: "2rem",
  lineHeight: "1.0"
})

</script>

<template>
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"/>
  <span class="material-symbols-outlined">{{ name }}</span>
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