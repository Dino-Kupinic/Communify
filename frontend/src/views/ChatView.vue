<script setup lang="ts">
import {useRoute} from "vue-router"
import {useRoomStore} from "@/stores/roomStore.ts"
import {ref, watch} from "vue"
import {Room} from "@/model/room.dto.ts"
import ChatHeader from "@/components/chat/ChatHeader.vue"

const route = useRoute()
const params = route.params

const roomStore = useRoomStore()
const room = ref<Room | undefined>(await roomStore.getRoomById(params.room as string))
</script>

<template>
  <div class="h-full">
    <ChatHeader :title="room?.name"/>
  </div>
</template>

