import express from "express";
import {
  createMessage,
  deleteMessage,
  getMessages,
} from "../controllers/message.controller.js";
import { verifyToken } from "../utility/verification.js";

const router = express.Router();

router.post("/create", verifyToken, createMessage);
router.delete("/delete/:id", verifyToken, deleteMessage);

router.get("/get/:chatId", getMessages);

export default router;
