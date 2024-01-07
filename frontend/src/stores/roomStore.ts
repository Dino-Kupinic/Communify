import {defineStore, storeToRefs} from "pinia"
import {pb} from "@/db/pocketbase.ts"
import {Room} from "@/model/room.dto.ts"
import {ref} from "vue"
import {useErrorStore} from "@/stores/errorStore.ts"

export const useRoomStore = defineStore("room", () => {
  const rooms = ref<Room[]>([])
  const currentRoom = ref<Room>()

  /**
   * Fetches rooms from the backend.
   *
   * @async
   * @function fetchRooms
   * @returns {Promise<void>} - Resolves when rooms are fetched successfully.
   */
  async function fetchRooms(): Promise<void> {
    try {
      rooms.value = await pb.collection("rooms").getFullList()
      await pb
        .collection("rooms")
        .subscribe("*", async ({action, record}) => {
          switch (action) {
            case "create":
              const newRoom = await pb.collection("rooms").getOne(record.id)
              record.expand = {newRoom}
              const room: Room = {
                name: record.name,
                maximum_users: record.maximum_users || null,
                description: record.description || null,
                password: record.password || null,
                creator_id: record.creator_id,
              }
              rooms.value.push(room)
              break
            case "update":
              // TODO
              break
            case "delete":
              // TODO
              break
          }
        })
    } catch (err) {
      handleError(err)
    }
  }

  /**
   * Adds a room to the server.
   *
   * @param {Room} room - The room object to be added.
   *
   * @return {Promise<void>} - A Promise that resolves after the room is added successfully or rejects with an error if there is any.
   */
  async function addRoom(room: Room): Promise<void> {
    try {
      const response = await pb.collection("rooms").create(room)
      if (response.ok)
        await fetchRooms()
    } catch (err) {
      handleError(err)
    }
  }

  /**
   * Deletes a room by its ID.
   *
   * @param {number} room_id The ID of the room to delete.
   * @return {Promise<void>} A Promise that resolves when the room is successfully deleted.
   *
   * @throws {Error} If an error occurs while attempting to delete the room.
   */
  async function deleteRoom(room_id: string): Promise<void> {
    try {
      await pb.collection("rooms").delete(room_id)
    } catch (err) {
      handleError(err)
    }
  }

  function handleError(err: any) {
    console.error(err)
    const {errorMessage} = storeToRefs(useErrorStore())
    errorMessage.value = `${err}`
  }

  return {rooms, currentRoom, fetchRooms, addRoom, deleteRoom}
})