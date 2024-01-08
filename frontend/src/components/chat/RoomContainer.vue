<script setup lang="ts">
import {Room} from "@/model/room.dto.ts"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {computed, ComputedRef} from "vue"

const props = defineProps<{
  room: Room
}>()

const title: ComputedRef<string> = computed(() => {
  if (props.room.name.length > 15)
    return `${props.room.name.slice(0, 15)}...`
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
    <div class="flex flex-row flex-wrap gap-1 mt-3">
      <Badge class="bg-red-600">Programming</Badge>
      <Badge class="bg-red-600">Programming</Badge>
      <Badge class="bg-red-600">Programming</Badge>
      <Badge class="bg-red-600">Programming</Badge>
    </div>
    <div class="flex flex-row flex-wrap gap-1 mt-auto">
      <div>
        <v-icon name="hi-solid-user-group" />
        {{ maximum_users }}
      </div>
    </div>
    <Button class="mt-auto">
      Join
    </Button>
  </div>
</template>
