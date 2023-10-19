import {reactive} from "vue"
import {io, Socket} from "socket.io-client"

export const state = reactive({
  connected: false,
})

export const BACKEND_URL: string = "http://localhost:4000"
// export const socket: Socket = io(URL, {autoConnect: false})

// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });
//
// socket.on("connect", () => {
//   state.connected = true
//   console.log("connected")
// })
//
// socket.on("disconnect", () => {
//   state.connected = false
//   console.log("disconnected")
// })
