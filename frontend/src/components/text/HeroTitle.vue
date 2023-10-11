<script setup lang="ts">

interface Props {
  fontFamily?: string
}

withDefaults(defineProps<Props>(), {
  fontFamily: "Inter",
})

</script>

<template>
  <h1>
    <slot></slot>
  </h1>
</template>

<style scoped>
h1 {
  font-family: v-bind(fontFamily);
  font-size: 7em;
  text-align: center;
  margin-top: 2em;
  padding-bottom: 0.3em;
  font-weight: 700;
  background: linear-gradient(90deg, var(--gradient-100), var(--gradient-200), var(--gradient-300), var(--gradient-400),
  var(--gradient-500), var(--gradient-600), var(--gradient-700), var(--gradient-800), var(--gradient-900));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>