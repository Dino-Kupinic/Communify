import {ref} from "vue"
import {defineStore} from "pinia"
import type {Room} from "@/model/types"
import {fetchData} from "@/model/util-functions"

export const useRoomStore = defineStore("room", () => {
  const rooms = ref<Room[]>([])

  /**
   * Fetches rooms from the backend.
   *
   * @async
   * @function fetchRooms
   *
   * @returns {Promise<void>} - Resolves when rooms are fetched successfully.
   */
  async function fetchRooms(): Promise<void> {
    try {
      rooms.value = await fetchData(
        "http://localhost:4000/room/getRooms", "GET", [["Content-Type", "application/json"]])
    } catch (err) {
      console.error(err)
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
      const response = await fetch("http://localhost:4000/room/createRoom", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(room),
      })
      if (response.ok)
        await fetchRooms()
    } catch (err) {
      console.error(err)
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
  async function deleteRoom(room_id: number): Promise<void> {
    try {
      await fetch(
        "http://localhost:4000/room/deleteRoomById/" + room_id,
        {
          method: "DELETE",
          mode: "cors",
          credentials: "same-origin",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        })
    } catch (err) {
      console.error(err)
    }
  }

  return {rooms, fetchRooms, addRoom, deleteRoom}
})
