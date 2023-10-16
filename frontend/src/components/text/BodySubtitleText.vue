<script setup lang="ts">
interface Props {
  fontSize?: string
}

withDefaults(defineProps<Props>(), {
  fontSize: "2rem",
})

</script>

<template>
  <h3>
    <slot></slot>
  </h3>
</template>

<style scoped>
h3 {
  display: inline;
  font-family: "Inter", serif;
  font-size: v-bind(fontSize);
  font-weight: 500;
  line-height: 1.2;
  color: var(--color-text-soft);
}

</style>