import express from "express";

import { verifyToken } from "../utility/verification.js";

import {
  startChat,
  sendMessage,
  getChatById,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/start", verifyToken, startChat);
router.post("/message", verifyToken, sendMessage);
router.get("/:chatId", verifyToken, getChatById);

export default router;
