<script setup lang="ts">
import {state} from "@/socket/socket"
import {computed} from "vue"

const connected = computed(() => {
  return state.connected
})
</script>

<template>
  <p>[SOCKET IO DEBUG]: is connected: {{ connected }}</p>

  <RouterView></RouterView>
</template>

<style scoped>
p {
  color: var(--error-500);
}
</style>
