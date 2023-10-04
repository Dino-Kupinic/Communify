<script setup lang="ts">

import ChatIcon from "@/components/user/UserIcon.vue"
import UserProfileText from "@/components/user/UserProfileText.vue"
</script>

<template>
  <div id="chatroomheader-container">
      <ChatIcon imgPath="src/assets/img/github.svg"></ChatIcon>
      <UserProfileText>Gruppe Reisinger</UserProfileText>
  </div>
</template>

<style scoped>
#chatroomheader-container {
  height: 6em;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  overflow: hidden;
  border-bottom: 1px solid var(--color-border-soft);
}

#iconContainer {
  height: 100%;
  width: min-content;
  padding: 14.75px;
}







</style>