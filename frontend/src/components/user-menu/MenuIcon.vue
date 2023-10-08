<script setup lang="ts">

const props = defineProps<{
  imgPath?: String
}>()

</script>

<template>
  <div id="img-container">
    <img :src=props.imgPath alt="menu-btn">
  </div>
</template>

<style scoped>
</style>