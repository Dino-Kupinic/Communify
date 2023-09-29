"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
const node_http_1 = require("node:http");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:10000",
    },
});
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
io.on("connection", (socket) => {
    console.log("a user connected");
});
server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
