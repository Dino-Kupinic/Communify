<script setup lang="ts">
interface Props {
  fontSize?: string
  color?: string
}

withDefaults(defineProps<Props>(), {
  color: "var(--color-text)",
  fontSize: "14px",
})

</script>

<template>
  <p>
    <slot></slot>
  </p>
</template>

<style scoped>
p {
  font-size: v-bind(fontSize);
  font-family: "Inter", serif;
  font-weight: 400;
  line-height: 1.5;
  color: v-bind(color);
}
</style>