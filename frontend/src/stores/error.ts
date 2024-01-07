import {defineStore} from "pinia"
import {ref} from "vue"

export const useErrorStore = defineStore("error", () => {
  const errorMessage = ref<string>("")
  const hint = ref<string>("")

  function clear() {
    errorMessage.value = ""
    hint.value = ""
  }

  return { errorMessage, hint, clear }
})