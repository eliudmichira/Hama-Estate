import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Get all chats for a user
router.get("/", verifyToken, (req, res) => {
  // Mock chat data
  res.json({
    data: [
      {
        id: "1",
        receiver: {
          id: "2",
          username: "john_doe",
          img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
        },
        lastMessage: "Hi, I'm interested in your property",
        createdAt: new Date().toISOString()
      },
      {
        id: "2", 
        receiver: {
          id: "3",
          username: "jane_smith",
          img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
        },
        lastMessage: "When can I schedule a viewing?",
        createdAt: new Date().toISOString()
      }
    ]
  });
});

// Get specific chat messages
router.get("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  // Mock chat messages
  res.json({
    data: {
      id,
      messages: [
        {
          id: "1",
          text: "Hi, I'm interested in your property",
          senderId: "2",
          createdAt: new Date().toISOString()
        },
        {
          id: "2", 
          text: "Great! When would you like to view it?",
          senderId: "1",
          createdAt: new Date().toISOString()
        }
      ]
    }
  });
});

// Mark chat as read
router.put("/read/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  // Mock response
  res.json({ success: true, message: "Chat marked as read" });
});

export default router; 