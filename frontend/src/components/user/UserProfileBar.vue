<script setup lang="ts">

const props = defineProps<{
  profilePicture?: String
  username?: String
}>()

</script>

<template>
<div id="userbar-container-div">
  <img id="user-profile" src="undefined">
  <span id="username"> {{ username }}</span>
</div>
</template>

<style scoped>
#userbar-container-div {
  width: 100%;
  height: 6em;
  background-color: var(--neutral-900);

}
</style>