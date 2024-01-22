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
                id: record.id,
                name: record.name,
                maximum_users: record.maximum_users,
                description: record.description || null,
                password: record.password || null,
                creator_id: record.creator_id,
                topic_id: record.topic_id || null,
              }
              rooms.value.push(room)
              break
            case "update":
              const updatedRoom = await pb.collection("rooms").getOne(record.id)
              record.expand = {updatedRoom}
              const roomUpdateIndex = rooms.value.findIndex((room) => room.id === record.id)
              if (roomUpdateIndex !== -1) {
                rooms.value[roomUpdateIndex].name = record.name
                rooms.value[roomUpdateIndex].creator_id = record.creator_id
                rooms.value[roomUpdateIndex].maximum_users = record.maximum_users
                rooms.value[roomUpdateIndex].description = record.description || null
                rooms.value[roomUpdateIndex].password = record.password || null
                rooms.value[roomUpdateIndex].topic_id = record.topic_id || null
              }
              break
            case "delete":
              const indexToDelete = rooms.value.findIndex((room) => room.name === record.name)
              if (indexToDelete !== -1) {
                rooms.value.splice(indexToDelete, 1)
              }
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
      await pb.collection("rooms").create(room)
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