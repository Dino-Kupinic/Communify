<script setup lang="ts">
defineProps<{
  width?: string
}>()

</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  width: v-bind(width);
}


</style>