<script setup lang="ts">
import RoomContainer from "@/components/chat/RoomContainer.vue"
import {useRoomStore} from "@/stores/roomStore.ts"
import {onMounted} from "vue"

const roomStore = useRoomStore()

onMounted(async () => {
  await roomStore.fetchRooms()
})
</script>

<template>
  <div class="flex flex-col gap-3 p-3">
    <RoomContainer v-for="room in roomStore.rooms" :room="room"></RoomContainer>
  </div>
</template>
