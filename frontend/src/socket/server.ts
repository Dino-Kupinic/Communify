import {io} from "socket.io-client"

export const BACKEND_URL = "http://localhost:4000/"

export const socket = io(BACKEND_URL);

socket.on("connect", () => {
  console.log("connected: " + socket.connected)
})

socket.on("disconnect", () => {
  console.log("connected: " + socket.connected)
})