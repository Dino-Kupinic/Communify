import express, {Express, Request, Response} from "express"
import {Server} from "socket.io"
import dotenv from "dotenv"
import {createServer} from "node:http"
import {ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData} from "./models/socket-io"
import {connectAndQuery} from "./database/db"

dotenv.config()

const app: Express = express()
const port: string | undefined = process.env.PORT
const FRONTEND_URL: string = "http://localhost:10000"

const server = createServer(app)
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