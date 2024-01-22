import {defineStore} from "pinia"
import {ref} from "vue"
import {AuthModel} from "pocketbase"
import {pb} from "@/db/pocketbase.ts"

export const useUserStore = defineStore("user", () => {
  const currentUser = ref<AuthModel>()
  const isLoggedIn = ref<boolean>(pb.authStore.isValid)
  return { currentUser, isLoggedIn }
}, {
  persist: true
})