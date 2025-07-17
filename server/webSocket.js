import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

 

const port = process.env.PORT || 5000;


const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Waiting list for matchmaking
const waitingUsers = [];

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // User sets username
  socket.on("setUsername", (username) => {
    socket.username = username || "Guest";
    console.log("Username set:", socket.username);

    // Add to waiting list
    waitingUsers.push(socket);
    console.log(`User ${socket.username} added to waiting list`);

    tryMatch();
  });

  // Send a message
  socket.on("send_message", ({ roomId, message }) => {
    console.log(`${socket.username}: ${message} in room: ${roomId}`);

    io.to(roomId).emit("receive_message", {
      senderUsername: socket.username,
      message,
    });
  });

  // User requests new match
  socket.on("find_new_match", () => {
    if (socket.roomId) {
      // Notify partner
      socket.to(socket.roomId).emit("partner_disconnected");

      // Leave room
      socket.leave(socket.roomId);
      socket.roomId = null;
    }

    waitingUsers.push(socket);
    console.log(`${socket.username} wants new match`);
    tryMatch();
  });

  // User disconnects
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);

    // Remove from waiting list
    const index = waitingUsers.indexOf(socket);
    if (index !== -1) {
      waitingUsers.splice(index, 1);
    }

    // Notify partner if matched
    if (socket.roomId) {
      socket.to(socket.roomId).emit("partner_disconnected");
    }
  });

  // Try to match two users
  function tryMatch() {
    if (waitingUsers.length >= 2) {
      const user1 = waitingUsers.shift();
      const user2 = waitingUsers.shift();

      const roomId = `room-${user1.id}-${user2.id}`;
      user1.roomId = roomId;
      user2.roomId = roomId;

      user1.join(roomId);
      user2.join(roomId);

      user1.emit("matched", {
        roomId,
        partnerUsername: user2.username,
      });

      user2.emit("matched", {
        roomId,
        partnerUsername: user1.username,
      });

      console.log(`✅ Matched: ${user1.username} & ${user2.username} in ${roomId}`);
    }
  }
});

server.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});