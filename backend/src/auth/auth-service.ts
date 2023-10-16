import {ClientService} from "../client/client-service"
import crypto from "crypto"
import {Client} from "../models/types"
const jwt = require("jsonwebtoken")

export class AuthService {
  constructor(private clientService: ClientService) {
  }

  async signIn(username: string, password: string) {
    const client: Client | undefined = await this.clientService.getClientByUsername(username)
    const hash: string = crypto.createHash("sha256").update(password).digest("hex")
    if (client?.password !== hash) {
      throw new Error("Invalid Password")
    }
    return jwt.sign({id: client.user_id}, process.env.SECRET, {algorithm: "HS256"})
  }

  async decodeToken(token: string) {
    try {
      return jwt.decode(token)
    } catch (error) {
      throw new Error("invalid JWT token")
    }
  }

  async getUserFromToken(token: string): Promise<Client | undefined> {
    const decodedToken = await this.decodeToken(token)
    const id: number = decodedToken.id
    const username = this.clientService.getClientById(id)
    if (!username) {
      throw new Error("username not found in JWT payload.")
    }
    return username
  }
}