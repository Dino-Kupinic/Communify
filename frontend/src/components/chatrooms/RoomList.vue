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
  height: 88vh;
  width: 100%;
  border-right: 1px solid var(--color-border-soft);
}
</style>