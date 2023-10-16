import {Pool, QueryResult, QueryResultRow} from "pg"

const DATABASE_PORT: number | undefined = process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined
const DATABASE_HOST: string = "database"
const DATABASE_NAME: string = "postgres"
const DATABASE_USERNAME: string = "postgres"
const DATABASE_PASSWORD: string = "123"

/**
 * Represents a client for connecting to a database.
 * @class
 * @param {object} options - The options for configuring the client.
 * @param {string} options.host - The hostname or IP address of the database server.
 * @param {number} options.port - The port number of the database server.
 * @param {string} options.database - The name of the database to connect to.
 * @param {string} options.user - The username for authentication.
 * @param {string} options.password - The password for authentication.
 */
export const pool: Pool = new Pool({
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  database: DATABASE_NAME,
  user: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

/**
 * Establishes a connection to the database and executes a query.
 *
 * @returns A promise that resolves to void.
 */
export async function connectAndQuery(): Promise<void> {
  try {
    await pool.connect()
    const res: QueryResult<QueryResultRow> = await pool.query("SELECT $1::text as message", ["Hello world!"])
    console.log(res.rows[0].message)
    console.log("Connected successfully to Database")
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message)
    }
    console.error(err)
  }
}

/**
 * Runs the given query function asynchronously.
 *
 * @param {Function} queryFunction - The query function to be executed.
 * @returns {Promise} A promise that resolves to the result of the query function execution.
 * @throws {Error} If an error occurs during the execution of the query function.
 */
export async function runQuery(queryFunction: any): Promise<any> {
  try {
    return await queryFunction()
  } catch (err) {
    console.error(err)
    throw err // rethrow the error to let the caller handle it if needed.
  }
}

