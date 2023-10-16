import express, {Express, Request, Response} from "express"
import dotenv from "dotenv"
import cors from "cors"
import {createServer} from "node:http"
import {errorHandler} from "./middleware/error-handler"
import {connectAndQuery} from "./database/db"
import {roomRouter} from "./room/room-controller"
import {clientRouter} from "./client/client-controller"
import {authRouter} from "./auth/auth-controller"
import {topicRouter} from "./topic/topic-controller"
import {messageRouter} from "./message/message-controller"

dotenv.config()

export const port: string | undefined = process.env.PORT
export const app: Express = express()
app.use(cors())
app.use(express.json())
app.use(errorHandler)

export const server = createServer(app)

const routes = [
  {path: "/room", router: roomRouter},
  {path: "/client", router: clientRouter},
  {path: "/auth", router: authRouter},
  {path: "/topic", router: topicRouter},
  {path: "/message", router: messageRouter},
]

routes.forEach(route => app.use(route.path, route.router))

app.get("/", (req: Request, res: Response): void => {
  res.send("Communify Backend")
})

server.listen(port, (): void => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
  connectAndQuery()
})