<script setup lang="ts">
import {Room} from "@/model/room.dto.ts"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {computed, ComputedRef, provide} from "vue"
import {Topic} from "@/model/topic.dto.ts"
import {useTopicStore} from "@/stores/topicsStore.ts"
import {storeToRefs} from "pinia"
import {useRouter} from "vue-router"
import {useFormatTitle} from "@/composables/useFormatTitle.ts"
import RoomInfoModel from "@/components/chat/RoomInfoModel.vue"
import {roomKey} from "@/model/room.key.ts"
import RoomPasswordModal from "@/components/chat/RoomPasswordModal.vue"
import {useErrorStore} from "@/stores/errorStore.ts"

const props = defineProps<{
  room: Room,
}>()
provide(roomKey, props.room)

const {topics} = storeToRefs(useTopicStore())
const roomTopics: ComputedRef<Topic[]> = computed(() => {
  return topics.value.filter((topic: Topic) => props.room.topic_id?.includes(topic.id))
})

const title = useFormatTitle(props.room.name, 25)
const description: ComputedRef<string> = computed(() => {
  const MAX_DISPLAY_DESCRIPTION: number = 50
  if (!props.room.description)
    return ""

  if (props.room.description.length > MAX_DISPLAY_DESCRIPTION)
    return `${props.room.description.slice(0, MAX_DISPLAY_DESCRIPTION)}...`
  return props.room.description
})
const maximum_users: ComputedRef<string> = computed(() => {
  if (props.room.maximum_users == 0)
    return "♾️"
  return String(props.room.maximum_users)
})

const router = useRouter()
const joinRoom = async () => {
  if (props.room.password) {
    return
  }
  await router.push(`/chats/${props.room.id}`)
}

const {errorMessage} = storeToRefs(useErrorStore())
const checkPassword = async (password: string) => {
  if (password === props.room.password) {
    await router.push(`/chats/${props.room.id}`)
  } else {
    errorMessage.value = "Incorrect Password."
  }
}
</script>

<template>
  <div
    class="flex flex-col w-full h-[240px] p-3 rounded-lg border border-slate-300 dark:border-slate-800 bg-background">
    <div class="flex flex-row">
      <p class="flex text-lg items-center overflow-clip overflow-ellipsis">{{ title }}</p>
      <div class="ml-auto flex-none">
        <RoomInfoModel :room-topics="roomTopics" :maximum_users="maximum_users">
          <Button variant="outline" size="icon">
            <v-icon name="hi-dots-horizontal"/>
          </Button>
        </RoomInfoModel>
      </div>
    </div>
    <span class="text-xs">{{ description }}</span>
    <div v-if="roomTopics" class="flex flex-row flex-wrap gap-1 mt-3">
      <Badge v-for="topic in roomTopics" :variant="topic.color">{{ topic.text }}</Badge>
    </div>
    <div v-if="roomTopics.length === 0">
      <span class="text-sm">No topics provided.</span>
    </div>
    <div class="flex flex-row flex-wrap gap-1 mt-auto">
      <div>
        <v-icon name="hi-solid-user-group"/>
        {{ maximum_users }}
      </div>
    </div>
    <div v-if="props.room.password">
      <v-icon name="hi-solid-lock-closed"/>
      <span class="text-sm ml-1">Password protected</span>
    </div>
    <div class="mt-auto">
      <RoomPasswordModal @password="checkPassword">
        <Button @click="joinRoom()" class="w-full" >
          Join
        </Button>
      </RoomPasswordModal>
    </div>
  </div>
</template>
