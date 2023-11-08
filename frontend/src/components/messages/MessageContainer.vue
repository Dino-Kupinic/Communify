<script setup lang="ts">
import {computed, onMounted, provide, ref} from "vue"
import MessageText from "@/components/messages/MessageText.vue"
import type {Client, Message} from "@/model/types"
import {fetchData} from "@/model/util-functions"
import {BACKEND_URL} from "@/socket/server"

const props = defineProps<{
  messageType: string
  message: Message
}>()
provide("messageType", props.messageType)

const isFromThem: boolean = props.messageType == "from-them"
const theirUsername = ref<string>("")

const formattedTimestamp = computed(() => {
  return new Date(props.message.timestamp).toISOString().split("T")[1].slice(0, 5)
})

onMounted(async () => {
  const client: Client = await fetchData(`${BACKEND_URL}/client/getClientById/` + props.message.user_id,
    "GET", [["Content-Type",
      "application/json"]],
  )
  theirUsername.value = client.username
})
</script>

<template>
  <MessageText>
    <div v-if="isFromThem">
      <span class="username">{{ theirUsername }}</span>
      <span class="timestamp">{{ formattedTimestamp }}</span>
      <br>
    </div>
    <slot></slot>
    <p v-if="!isFromThem" class="timestamp">{{ formattedTimestamp }}</p>
  </MessageText>
</template>

<style scoped>
.timestamp {
  margin-left: 0.5rem;
  color: var(--color-text-soft);
  font-size: 0.75rem;
  text-align: right;
}

.username {
  color: var(--brand-600);
  font-weight: 500;
}
</style>