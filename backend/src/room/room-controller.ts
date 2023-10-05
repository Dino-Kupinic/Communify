import {asyncHandler} from "../middleware/error-handler"
import express, {Router} from "express"
import {RoomService} from "./room-service"
import {Room} from "../models/types"
import {pool} from "../database/db"

export const roomRouter: Router = express.Router()
const roomService: RoomService = new RoomService(pool)

roomRouter.get("/getRooms", asyncHandler(async (req, res) => {
  const rooms: Room[] | undefined = await roomService.getAllRooms()
  res.send(rooms)
}))

roomRouter.get("/getRoomById/:id", asyncHandler(async (req, res) => {
  const {id} = req.params
  const room: Room | undefined = await roomService.getRoomById(parseInt(id))
  res.send(room)
}))

roomRouter.post("/new", asyncHandler(async (req, res) => {
  const room: Room = req.body
  await roomService.addRoom(room)
  res.status(200)
}))