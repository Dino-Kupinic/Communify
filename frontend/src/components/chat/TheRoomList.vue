<script setup lang="ts">
import RoomContainer from "@/components/chat/RoomContainer.vue"
import {useRoomStore} from "@/stores/roomStore.ts"
import {computed, ComputedRef, onMounted, ref} from "vue"
import {useTopicStore} from "@/stores/topicsStore.ts"
import {useUserStore} from "@/stores/userStore.ts"
import {Input} from "@/components/ui/input"
import {Room} from "@/model/room.dto.ts"
import {Button} from "@/components/ui/button"
import CreateRoomModal from "@/components/chat/CreateRoomModal.vue"
import CreateRoomImage from "@/components/img/CreateRoomImage.vue"

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
  <div class="flex flex-col gap-2 p-3 sm:w-[450px]">
    <div class="flex gap-2">
      <Input
        type="search"
        placeholder="Search..."
        class="w-full"
        v-model="searchInput"
      />
      <CreateRoomModal>
        <Button size="default">
          <v-icon name="io-add-circle"/>
          <span class="ml-1">New</span>
        </Button>
      </CreateRoomModal>
    </div>
    <RoomContainer v-if="filteredRooms.length > 0" v-for="room in filteredRooms" :room="room" :key="room.id"/>
    <div v-else class="flex justify-center items-center ml-16">
      <CreateRoomImage/>
    </div>
  </div>
</template>
