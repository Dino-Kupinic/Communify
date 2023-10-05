<script setup lang="ts">
import {state} from "@/socket/socket"
import {computed, watch} from "vue"

// TODO: remove later
const connected = computed(() => {
  return state.connected
})

watch(connected, () => {
  console.log("Connected: " + connected.value)
})
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped>
</style>
