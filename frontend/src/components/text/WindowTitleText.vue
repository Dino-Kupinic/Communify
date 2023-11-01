<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <h2> {{ title }} </h2>
</template>

<style scoped>
h2 {
  font-weight: 500;
  color: var(--color-text);
  font-family: -apple-system, Inter, sans-serif;
  text-align: center;
}

</style>