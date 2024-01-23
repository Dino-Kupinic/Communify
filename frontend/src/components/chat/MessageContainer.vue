<script setup lang="ts">
import {computed, ComputedRef} from "vue"
import {useUserStore} from "@/stores/userStore.ts"
import {Message} from "@/model/message.dto.ts"
import {storeToRefs} from "pinia"

const props = defineProps<{
  message: Message
}>()

const {users} = storeToRefs(useUserStore())
const username: ComputedRef<string> = computed(() => {
  const user = users.value.filter((user) => user.id == props.message.user)
  return user[0].username
})

const imgURL: ComputedRef<string> = computed(() => {
  return `https://api.dicebear.com/7.x/lorelei/svg?seed=${username.value}&scale=130&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear&radius=30&randomizeIds=true`
})

const time: ComputedRef<string> = computed(() => {
  const temp = new Date(props.message.created)
  const today = new Date()
  if (
    temp.getFullYear() === today.getFullYear() &&
    temp.getMonth() === today.getMonth() &&
    temp.getDate() === today.getDate()
  ) {
    return props.message.created.substring(11, 16)
  }
  return props.message.created.substring(0, 19)
})
</script>

<template>
  <div class="flex items-start gap-2.5">
    <div
      class="flex flex-col w-full leading-1.5 p-4 border-gray-200 rounded-e-xl rounded-es-xl">
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
        <img
          class="avatar"
          :src=imgURL
          alt="avatar"
          width="32px"
        />
        <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ username }}</span>
        <span class="text-xs font-normal text-gray-500 dark:text-gray-400 mt-0.5">{{ time }}</span>
      </div>
      <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
        <slot></slot>
      </p>
    </div>
  </div>
</template>
