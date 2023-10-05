import {Pool, PoolClient, QueryResult} from "pg"
import {Room} from "../models/types"


export class RoomService {
  constructor(private pool: Pool) {
  }

  /**
   * Retrieves all room from the database.
   *
   * @returns {Promise<Room[]>} A promise that resolves to an array of Room objects.
   */
  async getAllRooms(): Promise<Room[] | undefined> {
    try {
      const client: PoolClient = await this.pool.connect()
      const result: QueryResult<Room> = await client.query("SELECT * FROM room;")
      return result.rows
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * Retrieves a room by its ID.
   *
   * @param {number} room_id - The ID of the room to retrieve.
   * @return {Promise<Room>} - A promise that resolves to the room object matching the given ID.
   */
  async getRoomById(room_id: number): Promise<Room | undefined> {
    try {
      const result: QueryResult<Room> = await this.pool.query(
        "SELECT * FROM room WHERE room_id = $1;", [room_id],
      )
      return result.rows[0]
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * Adds a new room to the database.
   *
   * @param {Room} newRoom - The room object to be added.
   * @return {Promise<void>} - A promise that resolves when the room has been added successfully.
   */
  async addRoom(newRoom: Room): Promise<void> {
    await this.pool.query("INSERT INTO room (name, maximum_users, description, creator_id) VALUES ($1, $2, $3, $4);",
      [newRoom.name, newRoom.maximum_users, newRoom.description, newRoom.creator_id])
  }

  async deleteRoom() {

  }
}
