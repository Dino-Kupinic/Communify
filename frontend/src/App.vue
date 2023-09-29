<script setup lang="ts">
import {state} from "@/socket/socket"
import {computed} from "vue"

const connected = computed(() => {
  return state.connected
})
</script>

<template>
  <p>Is connected: {{ connected }}</p>
</template>

<style scoped>

</style>
