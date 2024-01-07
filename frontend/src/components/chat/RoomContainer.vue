<script setup lang="ts">
import {Room} from "@/model/room.dto.ts"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"

defineProps<{
  room: Room
}>()
</script>

<template>
  <div class="flex flex-col w-full h-[200px] p-3 rounded-lg border border-slate-300 dark:border-slate-800 bg-background">
    <div class="flex flex-row">
      <p class="text-lg">{{ room.name }}</p>
      <Button variant="outline" size="icon" class="ml-auto">
        <v-icon name="hi-dots-horizontal" />
      </Button>
    </div>
    <div>
      <Badge class="bg-red-600">Programming</Badge>
    </div>
    <Button class="mt-auto">
      Join
    </Button>
  </div>
</template>
