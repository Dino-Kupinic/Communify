import {Pool, PoolClient, QueryResult} from "pg"
import {Room} from "../models/types"
import {runQuery} from "../database/db"


export class RoomService {
  constructor(private pool: Pool) {
  }

  /**
   * Retrieves all room from the database.
   *
   * @returns {Promise<Room[]>} A promise that resolves to an array of Room objects.
   */
  async getAllRooms(): Promise<Room[] | undefined> {
    return runQuery(async (): Promise<Room[] | undefined> => {
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
    return runQuery(async (): Promise<Room | undefined> => {
      const client: PoolClient = await this.pool.connect()
      const result: QueryResult<Room> = await client.query(
        "SELECT * FROM room WHERE room_id = $1;", [room_id],
      )
      return result.rows[0]
    })
  }

  /**
   * Retrieves a room by its name.
   *
   * @param {string} name - The name of the room.
   * @return {Promise<Room|undefined>} - A promise that resolves to the room with the given name, or undefined if not found.
   */
  async getRoomByName(name: string): Promise<Room | undefined> {
    return runQuery(async (): Promise<Room | undefined> => {
      const client: PoolClient = await this.pool.connect()
      const result: QueryResult<Room> = await client.query(
        "SELECT * FROM room WHERE name = $1;", [name],
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
    return runQuery(async (): Promise<void> => {
      const client: PoolClient = await this.pool.connect()
      await client.query("INSERT INTO room (name, maximum_users, description, password, creator_id) VALUES ($1, $2, $3, $4, $5);",
        [newRoom.name, newRoom.maximum_users, newRoom.description, newRoom.password, newRoom.creator_id],
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
    return runQuery(async (): Promise<void> => {
      const client: PoolClient = await this.pool.connect()
      await client.query(`UPDATE room
                          SET ${propertyToEdit} = $1
                          WHERE room_id = $2`, [newPropertyValue, room_id],
      )
    })
  }

  /**
   * Deletes a room from the database.
   *
   * @param {number} room_id - The ID of the room to delete.
   * @returns {Promise<void>} - A promise that resolves when the deletion is complete.
   */
  async deleteRoomById(room_id: number): Promise<void> {
    return runQuery(async (): Promise<void> => {
      const client: PoolClient = await this.pool.connect()
      await client.query("DELETE FROM room WHERE room_id = $1", [room_id])
    })
  }
}
