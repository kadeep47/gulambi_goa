import { Server } from "socket.io";
import http from "http";
import { Message } from "../models";

const app = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });

