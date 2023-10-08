<script setup lang="ts">
const props = defineProps<{
  imgPath?: String;
}>()
</script>

<template>
  <div id="iconContainer">
    <img id="userImg" :src="imgPath" alt="User-Profilpicture">
  </div>
</template>

<style scoped>
#userImg {
  width: 46.25px;
  height: 47.22px;
}


</style>