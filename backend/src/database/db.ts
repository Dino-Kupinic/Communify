import {Client} from "pg"

const DATABASE_PORT: number | undefined = process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined
const DATABASE_HOST: string = "database"
const DATABASE_NAME: string = "chatapp"
const DATABASE_USERNAME: string = "postgres"
const DATABASE_PASSWORD: string = "123"

export const client: Client = new Client({
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  database: DATABASE_NAME,
  user: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
})


export async function connectAndQuery(): Promise<void> {
  try {
    await client.connect()
    console.log("Connected successfully to Database")
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message)
    }
    console.error(err)
  }
}

