import express, {Express, Request, Response} from "express"
import {Server} from "socket.io"
import dotenv from "dotenv"
import {createServer} from "node:http"
import {ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData} from "./models/socket-io"
import {errorHandler} from "./middleware/errorHandler"
import {connectAndQuery} from "./database/db"

dotenv.config()

const app: Express = express()
app.use(express.json())
app.use(errorHandler)


const port: string | undefined = process.env.PORT
const FRONTEND_URL: string = "http://localhost:10000"

const server = createServer(app)

/**
 * Represents an instance of a socket io server.
 *
 * @template ClientToServerEvents - The type of events sent from the client to the server.
 * @template ServerToClientEvents - The type of events sent from the server to the client.
 * @template InterServerEvents - The type of events exchanged between servers.
 * @template SocketData - The type of data transmitted over sockets.
 */
const io: Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
> = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
  },
})

app.get("/", (req: Request, res: Response): void => {
  res.send("Express + TypeScript Server")
})

io.on("connection", (socket) => {
  console.log("a user connected")
})

server.listen(port, (): void => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
  connectAndQuery()
})