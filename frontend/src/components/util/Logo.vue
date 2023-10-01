<script setup lang="ts">
import {onMounted, ref} from "vue"

const darkMode = window.matchMedia("(prefers-color-scheme: dark)")
const isDarkMode = ref(darkMode.matches)

onMounted(() => {
  darkMode.addEventListener("change", (e) => {
    isDarkMode.value = e.matches
  })
})
</script>

<template>
  <img v-if="isDarkMode" src="@/assets/img/CommunifyWhite.svg" alt="Dark Logo">
  <img v-else src="@/assets/img/Communify.svg" alt="Light Logo">
</template>

<style scoped>

</style>