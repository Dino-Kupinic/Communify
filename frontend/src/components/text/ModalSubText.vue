<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()

</script>

<template>
  <h3 id="chatroom-title"> {{ title }} </h3>
</template>

<style scoped>
h3 {
  margin-bottom: 2%;
  font-size: 2rem;
  font-weight: 500;
  color: var(--color-text)
}


</style>