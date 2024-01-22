import {defineStore, storeToRefs} from "pinia"
import {useErrorStore} from "@/stores/errorStore.ts"
import {pb} from "@/db/pocketbase.ts"
import {Message} from "@/model/message.dto.ts"

export const useMessageStore = defineStore("message", () => {
  async function getMessagesByRoomId(id: string): Promise<Message[] | undefined> {
    try {
      return await pb.collection("messages").getFullList({
        filter: pb.filter('room_id ~ {:id}', {id: id}),
        sort: "-created",
      })
    } catch (err) {
      handleError(err)
    }
  }

  function handleError(err: any) {
    console.error(err)
    const {errorMessage} = storeToRefs(useErrorStore())
    errorMessage.value = `${err}`
  }

  return {getMessagesByRoomId}
})