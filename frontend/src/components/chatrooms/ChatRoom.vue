<script setup lang="ts">
import ChatRoomHeaderBar from "@/components/chatrooms/ChatRoomHeaderBar.vue"
import UserInput from "@/components/user/UserInput.vue"
import MessageContainer from "@/components/messages/MessageContainer.vue"
import type {Message, Room} from "@/model/types"
import {onMounted, provide, ref} from "vue"
import {fetchData, getCurrentUserId, getFormattedTimestamp} from "@/model/util-functions"
import {io} from "socket.io-client"
import {socket} from "@/socket/server"

const props = defineProps<{
  room: Room
}>()
provide("room", props.room)

const messages = ref<Message[]>([])
const userMessage = ref<string>("")

onMounted(async () => {
  messages.value = await fetchData("http://localhost:4000/message/getAllMessagesFromRoomId/" + props.room.room_id,
    "GET",
    [["Content-Type", "application/json"]],
  )
})

async function sendMessage() {
  const currentUserId = await getCurrentUserId()
  const msg: Message = {
    message_id: null,
    content: userMessage.value,
    timestamp: getFormattedTimestamp(),
    user_id: currentUserId,
    room_id: props.room.room_id as number,
  }
  console.log("Emit chat message")
  socket.emit("chatMessage", msg)

  messages.value.push(msg)
  userMessage.value = ""
}
</script>

<template>
  <div id="chatroom-div-container">
    <header>
      <ChatRoomHeaderBar></ChatRoomHeaderBar>
    </header>
    <div id="content-container">
      <MessageContainer message-type="from-me" v-for="message in messages">{{ message.content }}</MessageContainer>
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