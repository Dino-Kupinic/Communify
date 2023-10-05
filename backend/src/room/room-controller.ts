import {asyncHandler} from "../middleware/error-handler"
import express, {Router} from "express"
import {RoomService} from "./room-service"
import {Room} from "../models/types"
import {pool} from "../database/db"

export const roomRouter: Router = express.Router()
const roomService: RoomService = new RoomService(pool)

/**
 * Retrieves the ID parameter from the request object.
 *
 * @param {express.Request} req - The request object.
 * @return {number} - The ID parameter as a number.
 */
function getIdFromParams(req: express.Request): number {
  const {id} = req.params
  return parseInt(id)
}

roomRouter.get("/getRooms", asyncHandler(async (req, res) => {
  const rooms: Room[] | undefined = await roomService.getAllRooms()
  res.send(rooms)
}))

roomRouter.get("/getRoomById/:id", asyncHandler(async (req, res) => {
  const room: Room | undefined = await roomService.getRoomById(getIdFromParams(req))
  res.send(room)
}))

roomRouter.post("/createRoom", asyncHandler(async (req, res) => {
  const room: Room = req.body
  await roomService.addRoom(room)
  res.status(200)
}))

roomRouter.put("/editRoom/:id", asyncHandler(async (req, res) => {
  const {propertyToEdit, newPropertyValue} = req.body
  await roomService.editRoomById(getIdFromParams(req), propertyToEdit, newPropertyValue)
  res.status(200)
}))

roomRouter.delete("/deleteRoomById/:id", asyncHandler(async (req, res) => {
  await roomService.deleteRoomById(getIdFromParams(req))
  res.status(200)
}))
