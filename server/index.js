import { WebSocketServer } from "ws";
import http from "http";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.VITE_WS_PORT || 3001;
const WS_URL = process.env.VITE_WS_URL || `ws://localhost:${PORT}`;
const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
	socket.on("message", (message) => {
		wss.clients.forEach((client) => {
			if (client !== socket && client.readyState === socket.OPEN) {
				client.send(message);
			}
		});
	});
});

server.listen(PORT, () => {
	console.log(`WebSocket server listening on ${WS_URL}`);
});
