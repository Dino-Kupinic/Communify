import {io} from "socket.io-client"

export const BACKEND_URL = "http://localhost:4000/"

export const socket = io(BACKEND_URL);
