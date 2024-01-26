<script setup lang="ts">
import {computed, ComputedRef} from "vue"
import {useUserStore} from "@/stores/userStore.ts"
import {Message} from "@/model/message.dto.ts"
import {storeToRefs} from "pinia"

const props = defineProps<{
  message: Message
}>()

const {users, currentUser} = storeToRefs(useUserStore())
const username: ComputedRef<string> = computed(() => {
  const user = users.value.filter((user) => user.id == props.message.user_id)
  return user[0].username
})

const imgURL: ComputedRef<string> = computed(() => {
  return `https://api.dicebear.com/7.x/lorelei/svg?seed=${username.value}&scale=130&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear&radius=30&randomizeIds=true`
})

const imgURLCurrentUser: ComputedRef<string> = computed(() => {
  return `https://api.dicebear.com/7.x/lorelei/svg?seed=${username.value}&scale=130&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear&radius=30&randomizeIds=true&flip=true`
})

const time: ComputedRef<string> = computed(() => {
  const temp = new Date(props.message.created);
  const localTime = temp.toLocaleString();

  const today = new Date();
  if (
    temp.getFullYear() === today.getFullYear() &&
    temp.getMonth() === today.getMonth() &&
    temp.getDate() === today.getDate()
  ) {
    return localTime.substring(11, 17);
  }
  return localTime.substring(0, 20);
});


</script>

<template>
  <div v-if="message.user_id != currentUser?.id" class="flex items-start gap-2.5">
    <div
      class="flex flex-col w-full sm:w-2/3 leading-1.5 p-2 pl-4">
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
        <img
          class="avatar"
          :src=imgURL
          alt="avatar"
          width="32px"
        />
        <span class="text font-semibold text-gray-900 dark:text-white">{{ username }}</span>
        <span class="text-xs font-normal text-gray-500 dark:text-gray-400 mt-0.5">{{ time }}</span>
      </div>
      <p class="text font-normal py-2.5 text-gray-900 dark:text-white">
        <slot></slot>
      </p>
    </div>
  </div>
  <div v-else class="flex justify-end items-end gap-2.5">
    <div
      class="flex flex-col w-full sm:w-2/3 leading-1.5 p-2 pr-4">
      <div class="flex items-center justify-end space-x-2 rtl:space-x-reverse">
        <span class="text-xs font-normal text-gray-500 dark:text-gray-400 mt-0.5">{{ time }}</span>
        <span class="text font-semibold text-primary dark:text-primary">{{ username }}</span>
        <img
          class="avatar"
          :src=imgURLCurrentUser
          alt="avatar"
          width="32px"
        />
      </div>
      <p class="text text-right font-normal py-2.5 text-gray-900 dark:text-white">
        <slot></slot>
      </p>
    </div>
  </div>
</template>
