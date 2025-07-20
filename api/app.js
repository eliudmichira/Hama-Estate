import express from "express";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import dashboardRoute from "./routes/dashboard.route.js";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express().use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://localhost:5174", 
    "http://localhost:5175", 
    "http://localhost:5176",
    "http://localhost:5177",
    "http://localhost:5178",
    "http://localhost:5179",
    "http://localhost:5180",
    "http://localhost:5181",
    "http://localhost:5182",
    "http://localhost:5183",
    "http://localhost:5184",
    "http://localhost:5185",
    "http://localhost:5186",
    "http://localhost:5187",
    "http://localhost:5188",
    "http://localhost:5189",
    "http://localhost:5190"
  ],
  credentials: true
}));

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute); 
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/dashboard", dashboardRoute);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Estate App Backend API", status: "running" });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.use("/api/posts/id", (req, res) => {
  res.send("auth works");
});

// Create HTTP server
const server = createServer(app);

// Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173", 
      "http://localhost:5174", 
      "http://localhost:5175", 
      "http://localhost:5176",
      "http://localhost:5177",
      "http://localhost:5178",
      "http://localhost:5179",
      "http://localhost:5180",
      "http://localhost:5181",
      "http://localhost:5182",
      "http://localhost:5183",
      "http://localhost:5184",
      "http://localhost:5185",
      "http://localhost:5186",
      "http://localhost:5187",
      "http://localhost:5188",
      "http://localhost:5189",
      "http://localhost:5190"
    ],
    credentials: true
  }
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("newUser", (userId) => {
    console.log("New user joined:", userId);
    socket.userId = userId;
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server
server.listen(8800, () => {
  console.log("HTTP server is running on port 8800");
});

// Start Socket.IO server on port 4000
const socketServer = createServer();
const socketIo = new Server(socketServer, {
  cors: {
    origin: [
      "http://localhost:5173", 
      "http://localhost:5174", 
      "http://localhost:5175", 
      "http://localhost:5176",
      "http://localhost:5177",
      "http://localhost:5178",
      "http://localhost:5179",
      "http://localhost:5180",
      "http://localhost:5181",
      "http://localhost:5182",
      "http://localhost:5183",
      "http://localhost:5184",
      "http://localhost:5185",
      "http://localhost:5186",
      "http://localhost:5187",
      "http://localhost:5188",
      "http://localhost:5189",
      "http://localhost:5190"
    ],
    credentials: true
  }
});

socketIo.on("connection", (socket) => {
  console.log("Socket.IO user connected:", socket.id);

  socket.on("newUser", (userId) => {
    console.log("New user joined via Socket.IO:", userId);
    socket.userId = userId;
  });

  socket.on("disconnect", () => {
    console.log("Socket.IO user disconnected:", socket.id);
  });
});

socketServer.listen(4000, () => {
  console.log("Socket.IO server is running on port 4000");
});
