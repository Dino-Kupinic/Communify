<script setup lang="ts">
import {computed} from "vue"
import {useUserStore} from "@/stores/userStore.ts"
import {Message} from "@/model/message.dto.ts"
import {User} from "@/model/user.dto.ts"

const props = defineProps<{
  message: Message
}>()
const userStore = useUserStore()
const username = computed(() => {
  const user = userStore.users.filter((user: User) => user.id === props.message.user_id)
  return user.username
})
</script>

<template>
  <div class="flex items-start gap-2.5">
    <div
      class="flex flex-col w-full leading-1.5 p-4 border-gray-200 rounded-e-xl rounded-es-xl">
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
        <img
          class="avatar"
          src="https://api.dicebear.com/7.x/lorelei/${}svg?scale=140&backgroundColor=b6e3f4,c0aede&?backgroundType=gradientLinear&radius=30&randomizeIds=true"
          alt="avatar"
          width="32px"
        />
        <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ username }}</span>
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ message.created }}</span>
      </div>
      <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
        <slot></slot>
      </p>
    </div>
  </div>
</template>
