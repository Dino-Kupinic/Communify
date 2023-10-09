<script setup lang="ts">
interface Props {
  width: number
  height: number
}

withDefaults(defineProps<Props>(), {
  width: 32,
  height: 32,
})
</script>

<template>
  <img src="../../assets/img/CommunifyLogo.svg" alt="Logo">
</template>

<style scoped>

</style>