import express, {Express, Request, Response} from "express"
import dotenv from "dotenv"
import {createServer} from "node:http"
import {errorHandler} from "./middleware/error-handler"
import {connectAndQuery} from "./database/db"
import {roomRouter} from "./room/room-controller"
import cors from "cors"

dotenv.config()

export const port: string | undefined = process.env.PORT
export const app: Express = express()
app.use(cors())
app.use(express.json())
app.use(errorHandler)

export const server = createServer(app)

// TODO: dynamic router imports
// const routes: string[] = [
//   "room",
// ]
//
// routes.forEach(async (route: string): Promise<void> => {
//   const {router} = await import(`./${route}/${route}-controller`)
//   app.use(`/${route}`, router)
// })
app.use("/room", roomRouter)

app.get("/", (req: Request, res: Response): void => {
  res.send("Communify Backend")
})

server.listen(port, (): void => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
  connectAndQuery()
})