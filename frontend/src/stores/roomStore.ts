import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRoomStore = defineStore('room', () => {
  const roomName = ref<string>("")

  return { roomName }
})
