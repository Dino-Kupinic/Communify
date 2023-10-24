import {asyncHandler} from "../middleware/error-handler"
import express, {Router} from "express"
import {ClientService} from "./client-service"
import {Client} from "../models/types"
import {pool} from "../database/db"

export const clientRouter: Router = express.Router()
const clientService: ClientService = new ClientService(pool)

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

clientRouter.get("/getClients", asyncHandler(async (req, res) => {
  const clients: Client[] | undefined = await clientService.getAllClients()
  res.send(clients)
}))

clientRouter.get("/getClientById/:id", asyncHandler(async (req, res) => {
  const client: Client | undefined = await clientService.getClientById(getIdFromParams(req))
  res.send(client)
}))

clientRouter.get("/getClientByUsername/:username", asyncHandler(async (req, res) => {
  const {username} = req.params
  const client: Client | undefined = await clientService.getClientByUsername(username)
  res.send(client)
}))

clientRouter.get("/getClientByEmail", asyncHandler(async (req, res) => {
  const {email} = req.body
  const client: Client | undefined = await clientService.getClientByEmail(email)
  res.send(client)
}))

clientRouter.post("/createClient", asyncHandler(async (req, res) => {
  const {username, email, password, biography, age, member_since, current_room_id} = req.body

  const emailExists = await clientService.getClientByEmail(email)
  const usernameExists = await clientService.getClientByUsername(username)
  if (emailExists) {
    res.status(400).send("Email exists. Couldn't create client")
    return
  } else if (usernameExists) {
    res.status(400).send("Username exists. Couldn't create client")
    return
  } else {
    await clientService.addClient({
      username: username,
      email: email,
      password: password,
      biography: biography,
      age: age,
      member_since: member_since,
      current_room_id: current_room_id,
    } as Client)
    res.send("Client created successfully")
  }
}))

clientRouter.put("/editClientById/:id", asyncHandler(async (req, res) => {
  const {propertyToEdit, newPropertyValue} = req.body
  await clientService.editClientById(getIdFromParams(req), propertyToEdit, newPropertyValue)
  res.send("Client edited successfully")
}))

clientRouter.put("/editClientByUsername/:username", asyncHandler(async (req, res) => {
  const {propertyToEdit, newPropertyValue} = req.body
  const {username} = req.params
  await clientService.editClientByUsername(username, propertyToEdit, newPropertyValue)
  res.send("Client edited successfully")
}))

clientRouter.delete("/deleteClientById/:id", asyncHandler(async (req, res) => {
  await clientService.deleteClientById(getIdFromParams(req))
  res.send("Client deleted successfully")
}))

clientRouter.delete("/deleteClientByUsername/:username", asyncHandler(async (req, res) => {
  const {username} = req.params
  await clientService.deleteClientByUsername(username)
  res.send("Client deleted successfully")
}))
