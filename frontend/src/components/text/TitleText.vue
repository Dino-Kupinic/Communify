<script setup lang="ts">
interface Props {
  title: string
  textAlign?: string
}

withDefaults(defineProps<Props>(), {
  textAlign: "center",
})
</script>

<template>
  <h3>{{ title }}</h3>
  <slot></slot>
</template>

<style scoped>
h3 {
  font-weight: 500;
  color: var(--color-text);
  font-family: Inter, sans-serif;
  text-align: v-bind(textAlign);
}

</style>