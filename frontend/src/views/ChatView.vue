<script setup lang="ts">
import {useRoute} from "vue-router"
import {useRoomStore} from "@/stores/roomStore.ts"
import {useMessageStore} from "@/stores/messageStore.ts"
import {onMounted, ref} from "vue"
import {Room} from "@/model/room.dto.ts"
import ChatHeader from "@/components/chat/ChatHeader.vue"
import {Message} from "@/model/message.dto.ts"
import ChatContainer from "@/components/chat/ChatContainer.vue"
import MessageContainer from "@/components/chat/MessageContainer.vue"

const route = useRoute()
const params = route.params

const roomStore = useRoomStore()
const room = ref<Room | undefined>(await roomStore.getRoomById(params.room as string))

const messageStore = useMessageStore()
const messages = ref<Message[] | undefined>([])
onMounted(async () => {
  messages.value = await messageStore.getMessagesByRoomId(params.room as string)
})
</script>

<template>
  <div class="h-full">
    <ChatHeader :title="room?.name"/>
    <ChatContainer >
      <MessageContainer v-for="message in messages" :key="message.id">
        <p>
          {{message.content}}
        </p>
      </MessageContainer>
    </ChatContainer>
  </div>
</template>

