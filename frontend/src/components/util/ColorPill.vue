<script setup lang="ts">
interface Props {
  color: string,
  width: string,
  height: string
}

withDefaults(defineProps<Props>(), {
  width: "20px",
  height: "20px"
})
</script>

<template>
  <div id="pill" class="rounded-full"></div>
</template>

<style scoped>
#pill {
  background-color: v-bind(color);
  width: v-bind(width);
  height: v-bind(height);
}
</style>