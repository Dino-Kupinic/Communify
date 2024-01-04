import express, {Router} from "express"
import {asyncHandler} from "../middleware/error-handler"
import {AuthService} from "./auth-service"
import {ClientService} from "../client/client-service"
import {pool} from "../database/db"

export const authRouter: Router = express.Router()
const authService = new AuthService(new ClientService(pool))

authRouter.post("/login", asyncHandler(async (req, res, next) => {
  const {username, password} = req.body
  const token = await authService.signIn(username, password)
  res.send({"token": token})
}))

authRouter.post("/hashPassword", asyncHandler(async (req, res, next) => {
  const {password} = req.body
  const pass = await authService.hashPassword(password)
  res.send({"password": pass})
}))

authRouter.get("/profile", asyncHandler(async (req, res, next) => {
  const token = req.headers.access_token as string
  if (!token) {
    throw new Error("JWT token is missing in headers")
  }
  const client = await authService.getUserFromToken(token)
  res.send(client)
}))
