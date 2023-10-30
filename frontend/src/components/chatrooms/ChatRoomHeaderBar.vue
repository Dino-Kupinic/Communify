<script setup lang="ts">
import UserProfileText from "@/components/user/UserProfileText.vue"
import HeroSubText from "@/components/text/HeroSubText.vue"
import {inject} from "vue"
import type {Room} from "@/model/types"

const room: Room | undefined = inject("room")
</script>


<template>
  <div id="chatroomheader-container">
    <UserProfileText id="profileText">{{ room?.name }}</UserProfileText>
  </div>
  <div id="hero-sub-text-container">
    <HeroSubText>
    </HeroSubText>
  </div>
</template>

<style scoped>
#chatroomheader-container {
  height: 8vh;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  overflow: hidden;
  border-bottom: 1px solid var(--color-border-soft);
}

#profileText {
  width: max-content;
}

#hero-sub-text-container {
  display: grid;
  height: 100%;
}

</style>