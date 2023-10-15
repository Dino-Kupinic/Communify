import {Pool, PoolClient, QueryResult} from "pg"
import {Topic} from "../models/types"
import {runQuery} from "../database/db"

export class TopicService {
  constructor(private pool: Pool) {
  }

  /**
   * Retrieves all topics associated with a given room ID.
   *
   * @param {number} room_id - The ID of the room.
   * @returns {Promise<Topic[] | undefined>} - A promise that resolves to an array of Topic objects or undefined.
   */
  async getAllTopicsFromRoomId(room_id: number): Promise<Topic[] | undefined> {
    return runQuery(async (): Promise<Topic[] | undefined> => {
      const client: PoolClient = await this.pool.connect()
      const query: string = `
          SELECT topic.*
          FROM topic
                   INNER JOIN topics_rooms ON topic.topic_id = topics_rooms.t_id
          WHERE topics_rooms.r_id = $1;
      `
      const result: QueryResult<Topic> = await client.query(query, [room_id])
      client.release()
      return result.rows
    })
  }

  /**
   * Retrieves all topics from the database.
   *
   * @returns {Promise<Topic[] | undefined>} A promise that resolves to an array of Topic objects or undefined if there are no topics.
   */
  async getAllTopics(): Promise<Topic[] | undefined> {
    return runQuery(async (): Promise<Topic[] | undefined> => {
      const client: PoolClient = await this.pool.connect()
      const result: QueryResult<Topic> = await client.query("SELECT * FROM topic;")
      client.release()
      return result.rows
    })
  }

  /**
   * Retrieves the topic ID by the given text and color.
   *
   * @param {string} text - The text of the topic.
   * @param {string} color - The color of the topic.
   *
   * @return {Promise<number | undefined>} - The ID of the topic, or undefined if not found.
   */
  async getTopicIdByTextAndColor(text: string, color: string): Promise<number | undefined> {
    return runQuery(async (): Promise<number | undefined> => {
      const client: PoolClient = await this.pool.connect()
      const result: QueryResult = await client.query("SELECT topic_id FROM topic WHERE text = $1 AND color = $2;",
        [text, color])
      client.release()
      return result.rows[0]
    })
  }

  /**
   * Adds a new topic to a specific room.
   *
   * @param {Topic} newTopic - The new topic object containing the text and color properties.
   * @param {number} room_id - The ID of the room where the topic will be added.
   * @returns {Promise<void>} - A promise that resolves when the topic is successfully added.
   */
  async addTopic(newTopic: Topic, room_id: number): Promise<void> {
    return runQuery(async (): Promise<void> => {
      const client: PoolClient = await this.pool.connect()
      const id = await client.query("INSERT INTO topic (text, color) VALUES ($1, $2) RETURNING topic_id;", [newTopic.text, newTopic.color])
      await client.query("INSERT INTO topics_rooms (t_id, r_id) VALUES ($1, $2)", [id, room_id])
      client.release()
    })
  }

  /**
   * Edits a topic by its ID.
   *
   * @param {number} topic_id - The ID of the topic to be edited.
   * @param {string} propertyToEdit - The name of the property to be edited.
   * @param {string | number} newPropertyValue - The new value for the property.
   *
   * @returns {Promise<void>} A promise that resolves when the topic is successfully edited.
   */
  async editTopicById(topic_id: number, propertyToEdit: string, newPropertyValue: string | number): Promise<void> {
    return runQuery(async (): Promise<void> => {
      const client: PoolClient = await this.pool.connect()
      await client.query(`UPDATE topic
                          SET ${propertyToEdit} = $1
                          WHERE topic_id = $2`, [newPropertyValue, topic_id],
      )
      client.release()
    })
  }

  /**
   * Deletes a topic from the database by its ID.
   *
   * @param {number} topic_id - The ID of the topic to be deleted.
   * @return {Promise<void>} - A promise that resolves when the topic is successfully deleted.
   */
  async deleteTopicById(topic_id: number): Promise<void> {
    return runQuery(async (): Promise<void> => {
      const client: PoolClient = await this.pool.connect()
      await client.query("DELETE FROM topic WHERE topic_id = $1", [topic_id])
      client.release()
    })
  }
}
