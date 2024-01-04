import {asyncHandler} from "../middleware/error-handler"
import express, {Router} from "express"
import {MessageService} from "./message-service"
import {Message} from "../models/types"
import {pool} from "../database/db"

export const messageRouter: Router = express.Router()
const messageService: MessageService = new MessageService(pool)

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

messageRouter.get("/getAllMessages", asyncHandler(async (req, res) => {
  const messages: Message[] | undefined = await messageService.getAllMessages()
  res.send(messages)
}))

messageRouter.get("/getAllMessagesFromRoomId/:id", asyncHandler(async (req, res) => {
  const messages: Message[] | undefined = await messageService.getAllMessagesFromRoomId(getIdFromParams(req))
  res.send(messages)
}))

messageRouter.post("/createMessage", asyncHandler(async (req, res) => {
  const {content, timestamp, user_id, room_id} = req.body
  await messageService.addMessage({
    user_id: user_id,
    content: content,
    timestamp: timestamp,
    room_id: room_id,
  } as Message)
  res.send(`Message for user ${user_id} in room ${room_id} created successfully`)
}))

