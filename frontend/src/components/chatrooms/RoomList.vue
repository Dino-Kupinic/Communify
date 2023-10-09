<script setup lang="ts">

</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>

<style scoped>
div {
  overflow-y: scroll;
  height: 80.6vh;
  width: 100%;
  border-right: 1px solid var(--color-border-very-soft);
  display: flex;
  flex-wrap: wrap;
}
</style>