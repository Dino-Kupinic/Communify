import express, {Express, Request, Response} from "express"
import {Server} from "socket.io"
import dotenv from "dotenv"
import {createServer} from "node:http"
import {ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData} from "./models/socket-io"
import {connectAndQuery} from "./database/database"

dotenv.config()

const app: Express = express()
const port: string | undefined = process.env.PORT

const server = createServer(app)
const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(server, {
  cors: {
    origin: "http://localhost:10000",
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