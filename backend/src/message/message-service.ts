import {Pool, PoolClient, QueryResult} from "pg"
import {Message} from "../models/types"
import {runQuery} from "../database/db"

export class MessageService {
  constructor(private pool: Pool) {
  }

  /**
   * Retrieves all messages from a specific room.
   *
   * @param {number} room_id - The ID of the room to retrieve messages from.
   * @returns {Promise<Message[] | undefined>} A promise that resolves with an array of messages from the room, or undefined if no messages are found.
   */
  async getAllMessagesFromRoomId(room_id: number): Promise<Message[] | undefined> {
    return runQuery(async (): Promise<Message[] | undefined> => {
      const client: PoolClient = await this.pool.connect()
      const result: QueryResult<Message> = await client.query("SELECT * FROM message WHERE room_id = $1;", [room_id])
      client.release()
      return result.rows
    })
  }

  /**
   * Retrieves all messages from the database.
   *
   * @return {Promise<Message[] | undefined>} A Promise that resolves with an array of Message objects,
   *         or undefined if no messages are found.
   */
  async getAllMessages(): Promise<Message[] | undefined> {
    return runQuery(async (): Promise<Message[] | undefined> => {
      const client: PoolClient = await this.pool.connect()
      const result: QueryResult<Message> = await client.query("SELECT * FROM message;")
      client.release()
      return result.rows
    })
  }

  /**
   * Add a new topic to the message table.
   *
   * @param {Message} newMessage - The new topic message to be added.
   *
   * @return {Promise<void>} - A promise that resolves with void when the new topic is added successfully.
   */
  async addMessage(newMessage: Message): Promise<void> {
    return runQuery(async (): Promise<void> => {
      const client: PoolClient = await this.pool.connect()
      await client.query("INSERT INTO message (user_id, content, timestamp, room_id) VALUES ($1, $2, $3, $4);",
        [newMessage.user_id, newMessage.content, newMessage.timestamp, newMessage.room_id])
      client.release()
    })
  }
}
