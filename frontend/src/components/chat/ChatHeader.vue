<script setup lang="ts">
import {useFormatTitle} from "@/composables/useFormatTitle.ts"
import {Button} from "@/components/ui/button"
import {useRouter} from "vue-router"

const props = defineProps<{
  title: string
}>()

const router = useRouter()
const formatTitle = useFormatTitle(props.title, 20)
</script>

<template>
  <div
    class="flex flex-row justify-center items-center w-full h-16 p-3 border-b border-slate-300 dark:border-slate-800">
    <div>
      <Button @click="router.push('/chats')" variant="outline" size="icon" class="mr-auto flex-none flex-grow-0">
        <v-icon name="hi-arrow-left"/>
      </Button>
    </div>
    <p class="text m-auto pr-3">{{ formatTitle }}</p>
  </div>
</template>
