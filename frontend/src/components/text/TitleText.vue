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
  font-weight: 500;
  color: var(--color-text);
  font-family: Inter,sans-serif;
  text-align: center;
}


</style>