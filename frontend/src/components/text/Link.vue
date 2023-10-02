<script setup lang="ts">
interface Props {
  link: string,
  opensTab?: boolean
}

withDefaults(defineProps<Props>(), {
  link: "",
  opensTab: false,
})
</script>

<template>
  <a v-if="opensTab" :href="link" target="_blank" rel="noopener noreferrer">
    <slot></slot>
  </a>
  <a v-else :href="link">
    <slot></slot>
  </a>
</template>

<style scoped>
a {
  text-decoration: none;
  color: var(--brand-500);
}

a:hover {
  color: var(--brand-400);
}
</style>