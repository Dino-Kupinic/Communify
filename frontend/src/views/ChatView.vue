<script setup lang="ts">
import {useRoute} from "vue-router"
import {useRoomStore} from "@/stores/roomStore.ts"
import {useUserStore} from "@/stores/userStore.ts"
import {useMessageStore} from "@/stores/messageStore.ts"
import {onMounted, onUnmounted, ref} from "vue"
import {Room} from "@/model/room.dto.ts"
import ChatHeader from "@/components/chat/ChatHeader.vue"
import {Message} from "@/model/message.dto.ts"
import ChatContainer from "@/components/chat/ChatContainer.vue"
import MessageContainer from "@/components/chat/MessageContainer.vue"
import {useErrorStore} from "@/stores/errorStore.ts"
import {storeToRefs} from "pinia"
import {Input} from "@/components/ui/input"
import InputContainer from "@/components/chat/InputContainer.vue"
import {pb} from "@/db/pocketbase.ts"

const route = useRoute()
const params = route.params

const roomStore = useRoomStore()
const room = ref<Room | undefined>(await roomStore.getRoomById(params.room as string))

const messageStore = useMessageStore()
const messages = ref<Message[] | undefined>([])

let unsubscribe: () => void
onMounted(async () => {
  messages.value = await messageStore.getMessagesByRoomId(params.room as string)
  unsubscribe = await pb
    .collection("messages")
    .subscribe("*", async ({action, record}) => {
      switch (action) {
        case "create":
          const newMsg = await pb.collection("messages").getOne(record.id)
          record.expand = {newMsg}
          const message: Message = {
            id: record.id,
            room_id: record.room_id,
            user_id: record.user_id,
            content: record.content,
            created: record.created,
          }
          if (!messages.value)
            messages.value = []
          messages.value.push(message)
          break
      }
    })

})

onUnmounted(() => {
  unsubscribe()
})

const messageInput = ref<string>("")
const userStore = useUserStore()

const messageContainsProfanity = async (text: string) => {
  // TODO
  return false
}

const {errorMessage} = storeToRefs(useErrorStore())
const sendMessage = async () => {
  if (await messageContainsProfanity(messageInput.value)) {
    errorMessage.value = "You message has not been send since it contains profanity."
    return
  }
  const msg: Partial<Message> = {
    // TODO: fix db user to user_id in app
    user: userStore.currentUser?.id,
    room_id: room.value?.id,
    content: messageInput.value,
  }
  await messageStore.sendMessage(msg)
  messageInput.value = ""
}
</script>

<template>
  <div class="h-full">
    <ChatHeader :title="room?.name"/>
    <ChatContainer>
      <MessageContainer v-for="message in messages" :key="message.id" :message="message">
        <p>
          {{ message.content }}
        </p>
      </MessageContainer>
    </ChatContainer>
    <InputContainer>
      <Input @keyup.enter.prevent="sendMessage()" type="text" v-model="messageInput" placeholder="Type here..."/>
    </InputContainer>
  </div>
</template>

