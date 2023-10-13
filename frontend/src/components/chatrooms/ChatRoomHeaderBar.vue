<script setup lang="ts">

import ChatIcon from "@/components/user/UserIcon.vue"
import UserProfileText from "@/components/user/UserProfileText.vue"
import HeroSubText from "@/components/text/HeroSubText.vue"
</script>

<template>
  <div id="chatroomheader-container">
      <ChatIcon imgPath="src/assets/img/github.svg"></ChatIcon>
      <UserProfileText id="profileText">Gruppe Reisinger</UserProfileText>
  </div>
  <div id="hero-sub-text-container">
    <HeroSubText>
    </HeroSubText>
  </div>
</template>

<style scoped>
#chatroomheader-container {
  height: 6em;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  overflow: hidden;
  border-bottom: 1px solid var(--color-border-soft);
}

#iconContainer {
  height: 100%;
  width: min-content;
  padding: 14.75px;
}
#profileText {
  width: max-content;
}

#hero-sub-text-container {
  display: grid;
  height: 100%;
}






</style>