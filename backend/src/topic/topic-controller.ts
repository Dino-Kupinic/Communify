import {asyncHandler} from "../middleware/error-handler"
import express, {Router} from "express"
import {TopicService} from "./topic-service"
import {Topic} from "../models/types"
import {pool} from "../database/db"

export const topicRouter: Router = express.Router()
const topicService: TopicService = new TopicService(pool)

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

topicRouter.get("/getTopics", asyncHandler(async (req, res) => {
  const topics: Topic[] | undefined = await topicService.getAllTopics()
  res.send(topics)
}))

topicRouter.get("/getTopicsByRoomId/:id", asyncHandler(async (req, res) => {
  const topics: Topic[] | undefined = await topicService.getAllTopicsFromRoomId(getIdFromParams(req))
  res.send(topics)
}))

topicRouter.post("/createTopic", asyncHandler(async (req, res) => {
  const {text, color, room_id} = req.body
  await topicService.addTopic({
    text: text,
    color: color,
  } as Topic, room_id)
  res.send(`Topic for room ${room_id} created successfully`)
}))

topicRouter.put("/editTopicById/:id", asyncHandler(async (req, res) => {
  const {propertyToEdit, newPropertyValue} = req.body
  await topicService.editTopicById(getIdFromParams(req), propertyToEdit, newPropertyValue)
  res.send("Topic edited successfully")
}))

topicRouter.delete("/deleteTopicById/:id", asyncHandler(async (req, res) => {
  await topicService.deleteTopicById(getIdFromParams(req))
  res.send("Topic deleted successfully")
}))

