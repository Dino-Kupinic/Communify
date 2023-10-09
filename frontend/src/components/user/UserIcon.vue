<script setup lang="ts">
defineProps<{
  initials: string;
}>()
</script>

<template>
  <div>
    <h2>{{ initials }}</h2>
  </div>
</template>

<style scoped>
div {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--brand-500);
  width: 3em;
  height: 3em;
  border-radius: 30px;
}

</style>