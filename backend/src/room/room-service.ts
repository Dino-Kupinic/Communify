import {Pool, PoolClient, QueryResult} from "pg"
import {Room} from "../models/types"


export class RoomService {
  constructor(private pool: Pool) {
  }

  /**
   * Runs the given query function asynchronously.
   *
   * @param {Function} queryFunction - The query function to be executed.
   * @returns {Promise} A promise that resolves to the result of the query function execution.
   * @throws {Error} If an error occurs during the execution of the query function.
   */
  async runQuery(queryFunction: any): Promise<any> {
    try {
      return await queryFunction()
    } catch (err) {
      console.error(err)
      throw err // rethrow the error to let the caller handle it if needed.
    }
  }

  /**
   * Retrieves all room from the database.
   *
   * @returns {Promise<Room[]>} A promise that resolves to an array of Room objects.
   */
  async getAllRooms(): Promise<Room[] | undefined> {
    return this.runQuery(async (): Promise<Room[] | undefined> => {
      const client: PoolClient = await this.pool.connect()
      const result: QueryResult<Room> = await client.query("SELECT * FROM room;")
      return result.rows
    })
  }

  /**
   * Retrieves a room by its ID.
   *
   * @param {number} room_id - The ID of the room to retrieve.
   * @return {Promise<Room>} - A promise that resolves to the room object matching the given ID.
   */
  async getRoomById(room_id: number): Promise<Room | undefined> {
    return this.runQuery(async (): Promise<Room | undefined> => {
      const result: QueryResult<Room> = await this.pool.query(
        "SELECT * FROM room WHERE room_id = $1;", [room_id],
      )
      return result.rows[0]
    })
  }

  /**
   * Adds a new room to the database.
   *
   * @param {Room} newRoom - The room object containing the details of the new room.
   * @return {Promise<void>} - A Promise that resolves when the room is successfully added.
   */
  async addRoom(newRoom: Room): Promise<void> {
    return this.runQuery(async (): Promise<void> => {
      await this.pool.query("INSERT INTO room (name, maximum_users, description, creator_id) VALUES ($1, $2, $3, $4);",
        [newRoom.name, newRoom.maximum_users, newRoom.description, newRoom.creator_id],
      )
    })
  }

  /**
   * Edit a room by updating the specified property with a new value.
   *
   * @param {number} room_id - The ID of the room to edit.
   * @param {string} propertyToEdit - The name of the property to edit.
   * @param {string|number} newPropertyValue - The new value for the property.
   *
   * @return {Promise<void>} - A promise that resolves once the room is edited successfully.
   */
  async editRoomById(room_id: number, propertyToEdit: string, newPropertyValue: string | number): Promise<void> {
    return this.runQuery(async (): Promise<void> => {
      await this.pool.query(`UPDATE room SET ${propertyToEdit} = $1 WHERE room_id = $2`, [newPropertyValue, room_id])
    })
  }

  /**
   * Deletes a room from the database.
   *
   * @param {number} room_id - The ID of the room to delete.
   * @returns {Promise<void>} - A promise that resolves when the deletion is complete.
   */
  async deleteRoomById(room_id: number): Promise<void> {
    return this.runQuery(async (): Promise<void> => {
      await this.pool.query("DELETE FROM room WHERE room_id = $1", [room_id])
    })
  }
}
