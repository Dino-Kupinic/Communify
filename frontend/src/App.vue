<script setup lang="ts">
import {onMounted} from "vue"

onMounted(() => {
  if (!localStorage.getItem("auth_token"))
    localStorage.setItem("auth_token", "")
})
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped>
</style>
