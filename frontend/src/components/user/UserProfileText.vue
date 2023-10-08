<script setup lang="ts">

</script>

<template>
  <span>
    <slot></slot>
  </span>
</template>

<style scoped>
span {
  overflow-x: scroll;
  font-size: 150%;
  width: 91%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
</style>