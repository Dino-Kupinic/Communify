import {defineStore} from "pinia"
import {ref} from "vue"
import {AuthModel} from "pocketbase"

export const useUserStore = defineStore("user", () => {
  const currentUser = ref<AuthModel>()

  return { currentUser }
})