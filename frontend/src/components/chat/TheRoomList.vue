<script setup lang="ts">
import RoomContainer from "@/components/chat/RoomContainer.vue"
import {useRoomStore} from "@/stores/roomStore.ts"
import {computed, ComputedRef, onMounted, ref} from "vue"
import {useTopicStore} from "@/stores/topicsStore.ts"
import {useUserStore} from "@/stores/userStore.ts"
import {Input} from "@/components/ui/input"
import {Room} from "@/model/room.dto.ts"

const roomStore = useRoomStore()
const topicStore = useTopicStore()
const userStore = useUserStore()

onMounted(async () => {
  await roomStore.fetchRooms()
  await topicStore.fetchTopics()
  await userStore.fetchUsers()
})

const searchInput = ref<string>("")
const filteredRooms: ComputedRef<Room[]> = computed(() => {
  if (searchInput.value === "")
    return roomStore.rooms
  return roomStore.rooms.filter((room: Room) => room.name.toLowerCase().includes(searchInput.value.toLowerCase()))
})
</script>

<template>
  <div class="flex flex-col gap-3 p-3 sm:w-[400px]">
    <div>
      <Input
        type="search"
        placeholder="Search..."
        class="w-full"
        v-model="searchInput"
      />
    </div>
    <RoomContainer v-for="room in filteredRooms" :room="room" :key="room.id"/>
  </div>
</template>
