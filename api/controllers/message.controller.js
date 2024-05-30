import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";
import { errorHandler } from "../utility/error.js";
import mongoose from "mongoose";
export const createMessage = async (req, res, next) => {
  try {
    const { chatId, senderId, receiverId, message } = req.body;
    const newMessage = new Message({ chatId, senderId, receiverId, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    return next(errorHandler(404, "message not found"));
  }

  if (req.user.id !== message.userRef) {
    return next(errorHandler(401, "You can only delete your own message"));
  }

  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json("Message has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { userId } = req.query;

    // Check if chatId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({ error: "Invalid chat ID" });
    }

    const chat = await Chat.findById(chatId);
    if (!chat || !chat.participants.includes(userId)) {
      return res
        .status(403)
        .json({ error: "You are not a participant in this chat" });
    }

    const messages = await Message.find({ chatId }).sort("createdAt");
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal vdfvserver error" });
  }
};
