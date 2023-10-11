import {Pool, PoolClient, QueryResult} from "pg"
import {Client, Room} from "../models/types"
import {runQuery} from "../database/db"


export class ClientService {
  constructor(private pool: Pool) {
  }

  /**
   * Retrieves all clients from the database.
   *
   * @returns {Promise<Client[] | undefined>} A promise that resolves with an array of clients,
   *         or undefined if an error occurs.
   */
  async getAllClients(): Promise<Client[] | undefined> {
    return runQuery(async (): Promise<Client[] | undefined> => {
      const client: PoolClient = await this.pool.connect()
      const result: QueryResult<Client> = await client.query("SELECT * FROM client;")
      return result.rows
    })
  }

  /**
   * Retrieves a client from the database based on the provided user ID.
   *
   * @param {number} user_id - The ID of the user to retrieve the client for.
   * @returns {Promise<Client | undefined>} A promise that resolves to the retrieved client object or undefined if the client is not found.
   */
  async getClientById(user_id: number): Promise<Client | undefined> {
    return runQuery(async (): Promise<Client | undefined> => {
      const client: PoolClient = await this.pool.connect()
      const result: QueryResult<Client> = await client.query(
        "SELECT * FROM client WHERE user_id = $1;", [user_id],
      )
      return result.rows[0]
    })
  }

  /**
   * Retrieves a client by their username.
   *
   * @param {string} username - The username to search for.
   * @returns {Promise<Client | undefined>} A promise that resolves to the client object if found, otherwise undefined.
   */
  async getClientByUsername(username: string): Promise<Client | undefined> {
    return runQuery(async (): Promise<Client | undefined> => {
      const client: PoolClient = await this.pool.connect()
      const result: QueryResult<Client> = await client.query(
        "SELECT * FROM client WHERE username = $1;", [username],
      )
      return result.rows[0]
    })
  }

  /**
   * Inserts a new client to the database.
   *
   * @param {Client} newClient - The client object containing the client details.
   * @returns {Promise<void>} - A promise that resolves when the client is added successfully, or rejects with an error.
   */
  async addClient(newClient: Client): Promise<void> {
    return runQuery(async (): Promise<void> => {
      const client: PoolClient = await this.pool.connect()
      await client.query("INSERT INTO client (username, email, password, biography, age, member_since, current_room_id) " +
        "VALUES ($1, $2, $3, $4, $5, $6, $7);", [newClient.username, newClient.email, newClient.password, newClient.biography, newClient.age,
        newClient.member_since, newClient.current_room_id],
      )
    })
  }

  /**
   * Edits a client by their ID.
   *
   * @param {number} user_id - The ID of the client to edit.
   * @param {string} propertyToEdit - The name of the property to edit.
   * @param {string|number} newPropertyValue - The new value for the property.
   * @returns {Promise<void>} - A promise that resolves when the client has been edited successfully.
   */
  async editClientById(user_id: number, propertyToEdit: string, newPropertyValue: string | number): Promise<void> {
    return runQuery(async (): Promise<void> => {
      const client: PoolClient = await this.pool.connect()
      await client.query(`UPDATE client
                          SET ${propertyToEdit} = $1
                          WHERE user_id = $2`, [newPropertyValue, user_id],
      )
    })
  }

  /**
   * Edits a client's property by username.
   *
   * @param {string} username - The username of the client.
   * @param {string} propertyToEdit - The name of the property to edit.
   * @param {string|number} newPropertyValue - The new value of the property.
   * @return {Promise<void>} - A promise that resolves when the edit is successful, or rejects with an error.
   */
  async editClientByUsername(username: string, propertyToEdit: string, newPropertyValue: string | number): Promise<void> {
    return runQuery(async (): Promise<void> => {
      const client: PoolClient = await this.pool.connect()
      await client.query(`UPDATE client
                          SET ${propertyToEdit} = $1
                          WHERE username = $2`, [newPropertyValue, username],
      )
    })
  }

  /**
   * Deletes a client from the database based on the provided user_id.
   *
   * @param {number} user_id - The ID of the client to delete.
   * @return {Promise<void>} - A promise that resolves when the client is successfully deleted.
   */
  async deleteClientById(user_id: number): Promise<void> {
    return runQuery(async (): Promise<void> => {
      const client: PoolClient = await this.pool.connect()
      await client.query("DELETE FROM client WHERE user_id = $1", [user_id])
    })
  }

  /**
   * Deletes a client from the database by username.
   *
   * @param {string} username - The username of the client to delete.
   * @return {Promise<void>} - A promise that resolves when the deletion is successful.
   */
  async deleteClientByUsername(username: string): Promise<void> {
    return runQuery(async (): Promise<void> => {
      const client: PoolClient = await this.pool.connect()
      await client.query("DELETE FROM client WHERE username = $1", [username])
    })
  }
}
