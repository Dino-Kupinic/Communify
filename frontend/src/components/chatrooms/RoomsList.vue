<script setup lang="ts">
import ChatRoom from "@/components/chatrooms/ChatRoom.vue"
import Title from "@/components/text/TitleText.vue"
import TitleText from "@/components/text/TitleText.vue"

const props = defineProps<{
  title?: string
}>()


</script>

<template>
    <div id="chatroom-div">
      <TitleText :title="title"></TitleText>
    </div>
</template>

<style scoped>
#chatroom-div {
  width: 100%;
  height: 6em;
  padding: 0.5%;
  border-top: 1px solid var(--color-border-soft);
  background-color: var(--neutral-900);
}




</style>