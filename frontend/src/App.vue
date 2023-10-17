<script setup lang="ts">
import {state} from "@/socket/socket"
import {computed, onMounted, watch} from "vue"

// TODO: remove later
const connected = computed(() => {
  return state.connected
})

watch(connected, () => {
  console.log("Connected: " + connected.value)
})

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
