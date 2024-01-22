<script setup lang="ts">
import {Room} from "@/model/room.dto.ts"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {computed, ComputedRef, onMounted, ref} from "vue"
import {Topic} from "@/model/topic.dto.ts"
import {useTopicStore} from "@/stores/topicsStore.ts"
import {storeToRefs} from "pinia"

const props = defineProps<{
  room: Room
}>()

onMounted(() => {
})

const {topics} = storeToRefs(useTopicStore())
const roomTopics: ComputedRef<Topic | Topic[]> = computed(() => {
  return topics.value.filter((topic: Topic) => props.room.topic_id?.includes(topic.id))
})

const title: ComputedRef<string> = computed(() => {
  const MAX_DISPLAY_ROOM_NAME: number = 15
  if (props.room.name.length > MAX_DISPLAY_ROOM_NAME)
    return `${props.room.name.slice(0, MAX_DISPLAY_ROOM_NAME)}...`
  return props.room.name
})

const maximum_users: ComputedRef<string> = computed(() => {
  if (props.room.maximum_users == 0)
    return "♾️"
  return String(props.room.maximum_users)
})

</script>

<template>
  <div
    class="flex flex-col w-full h-[240px] p-3 rounded-lg border border-slate-300 dark:border-slate-800 bg-background">
    <div class="flex flex-row">
      <p class="flex text-lg items-center overflow-clip overflow-ellipsis">{{ title }}</p>
      <Button variant="outline" size="icon" class="ml-auto flex-none">
        <v-icon name="hi-dots-horizontal"/>
      </Button>
    </div>
    <div v-if="roomTopics" class="flex flex-row flex-wrap gap-1 mt-3">
      <Badge v-for="topic in roomTopics" :variant="topic.color">{{ topic.text }}</Badge>
    </div>
    <div class="flex flex-row flex-wrap gap-1 mt-auto">
      <div>
        <v-icon name="hi-solid-user-group"/>
        {{ maximum_users }}
      </div>
    </div>
    <Button class="mt-auto">
      Join
    </Button>
  </div>
</template>
