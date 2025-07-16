import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 5000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URI || "*", // Frontend ka URL lagana ho to yahan dal sakte ho
  },
});

const waitingUsers = [];

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("setUsername", (username) => {
    console.log("Username set:", username);
    socket.username = username || "Guest";

    waitingUsers.push(socket);
    console.log(`User ${socket.username} added to waiting list`);

    tryMatch();
  });

  socket.on("send_message", ({ roomId, message }) => {
    console.log(`${socket.username}: ${message} in room: ${roomId}`);
    io.to(roomId).emit("receive_message", {
      senderUsername: socket.username,
      message,
    });
  });

  socket.on("find_new_match", () => {
    if (socket.roomId) {
      socket.leave(socket.roomId);
      socket.roomId = null;
    }
    waitingUsers.push(socket);
    console.log(`${socket.username} wants new match`);
    tryMatch();
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);

    // Waiting list se remove
    const index = waitingUsers.indexOf(socket);
    if (index !== -1) {
      waitingUsers.splice(index, 1);
    }

    if (socket.roomId) {
      io.to(socket.roomId).emit("partner_disconnected");
    }
  });

  function tryMatch() {
    if (waitingUsers.length >= 2) {
      const user1 = waitingUsers.shift();
      const user2 = waitingUsers.shift();

      const roomId = `room-${user1.id}-${user2.id}`;
      user1.roomId = roomId;
      user2.roomId = roomId;

      user1.join(roomId);
      user2.join(roomId);

      user1.emit("matched", { roomId, partnerUsername: user2.username });
      user2.emit("matched", { roomId, partnerUsername: user1.username });

      console.log(`✅ Matched: ${user1.username} & ${user2.username} in ${roomId}`);
    }
  }
});

server.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});