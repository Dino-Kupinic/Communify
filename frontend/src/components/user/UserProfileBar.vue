<script setup lang="ts">

import UserIcon from "@/components/user/UserIcon.vue"
import UserProfileText from "@/components/user/UserProfileText.vue"

const props = defineProps<{
  username?: String
}>()

</script>

<template>
  <div id="userbar-container-div">
    <UserIcon imgPath="src/assets/img/github.svg"></UserIcon>
    <UserProfileText id="username">
      {{ username }}
    </UserProfileText>
  </div>
</template>

<style scoped>
#userbar-container-div {
  width: 100%;
  height: 6em;
  background-color: var(--color-background);
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid var(--color-border-soft);
}

#username {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  width: 70%;
}

#iconContainer {
  height: 100%;
  width: min-content;
  padding: 14.75px;
}

</style>