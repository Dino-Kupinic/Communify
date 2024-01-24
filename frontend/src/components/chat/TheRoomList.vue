<script setup lang="ts">
import RoomContainer from "@/components/chat/RoomContainer.vue"
import {useRoomStore} from "@/stores/roomStore.ts"
import {onMounted} from "vue"
import {useTopicStore} from "@/stores/topicsStore.ts"
import {useUserStore} from "@/stores/userStore.ts"

const roomStore = useRoomStore()
const topicStore = useTopicStore()
const userStore = useUserStore()

onMounted(async () => {
  await roomStore.fetchRooms()
  await topicStore.fetchTopics()
  await userStore.fetchUsers()
})
</script>

<template>
  <div class="flex flex-col gap-3 p-3 sm:w-[400px]">
    <RoomContainer v-for="room in roomStore.rooms" :room="room"></RoomContainer>
  </div>
</template>
