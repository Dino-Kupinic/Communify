<script setup lang="ts">
interface Props {
  width?: number
  height?: number
}

withDefaults(defineProps<Props>(), {
  width: 300,
  height: 60,
})
</script>

<template>
  <img src="../../assets/img/Communify.svg" :width="width" :height="height" alt="Logo">
</template>

<style scoped>

</style>