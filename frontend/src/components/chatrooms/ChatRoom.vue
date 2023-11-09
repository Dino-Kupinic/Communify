<script setup lang="ts">
import ChatRoomHeaderBar from "@/components/chatrooms/ChatRoomHeaderBar.vue"
import UserInput from "@/components/user/UserInput.vue"
import MessageContainer from "@/components/messages/MessageContainer.vue"
import type {Message, Room} from "@/model/types"
import {onMounted, onUnmounted, onUpdated, provide, reactive, ref, watch} from "vue"
import {fetchData, getCurrentUserId, getFormattedTimestamp} from "@/model/util-functions"
import {BACKEND_URL, socket} from "@/socket/server"
import Spinner from "@/components/util/Spinner.vue"

const props = defineProps<{
  room: Room
}>()
const refRoom = ref<Room>(props.room)
provide("room", refRoom)
watch(() => props.room, (newRoom) => {
  refRoom.value = newRoom
})

const messages = ref<Message[]>([])
const userMessage = ref<string>("")
const currentUserId = ref<number>()
const isLoading = ref<boolean>(true)

onMounted(async () => {
  setTimeout(() => {
    isLoading.value = false
  }, 500)
  await joinRoomAndFetchMessages()
  currentUserId.value = await getCurrentUserId()
})

onUpdated(async () => {
  setTimeout(() => {
    isLoading.value = false
  }, 500)
  await joinRoomAndFetchMessages()
})

async function joinRoomAndFetchMessages() {
  socket.emit("joinRoom", `room-${props.room.room_id}`)
  messages.value = await fetchData(`${BACKEND_URL}/message/getAllMessagesFromRoomId/` + props.room.room_id,
    "GET",
    [["Content-Type", "application/json"]],
  )
}

async function sendMessage() {
  const currentUserId = await getCurrentUserId()
  const msg: Message = {
    message_id: null,
    content: userMessage.value,
    timestamp: getFormattedTimestamp(),
    user_id: currentUserId,
    room_id: props.room.room_id as number,
  }
  socket.emit("chatMessage", msg)

  messages.value.push(msg)
  userMessage.value = ""
}

socket.on("newMessage", (msg: Message) => {
  if (msg.user_id != currentUserId.value)
    messages.value.push(msg)
})
</script>

<template>
  <div id="chatroom-div-container">
    <header>
      <ChatRoomHeaderBar></ChatRoomHeaderBar>
    </header>
    <div id="content-container">
      <div v-if="isLoading"
           class="loading">
        <Spinner></Spinner>
      </div>
      <MessageContainer
        v-else
        v-for="message in messages"
        :key="message.message_id as number"
        :message="message"
        :message-type="message.user_id === currentUserId ? 'from-me' : 'from-them'"
      >
        {{ message.content }}
      </MessageContainer>
    </div>
    <div id="Input-Container">
      <UserInput @send="sendMessage" v-model="userMessage"></UserInput>
    </div>
  </div>
</template>

<style scoped>
#chatroom-div-container {
  width: 75%;
  float: right;
}

#content-container {
  height: 86vh;
  background-color: var(--color-background-soft);
  overflow-y: scroll;
  border-bottom: 1px solid var(--color-border-soft);
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1.1rem;
}

.loading {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

header {
  height: 8vh;
  width: 100%;
  border-bottom: 1px solid var(--color-border-soft);
  padding: 0;
}

#Input-Container {
  padding: 0.75rem;
  height: 6vh;
  position: sticky;
}
</style>