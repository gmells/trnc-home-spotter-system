import Chat from "../models/chat.model.js";
export const startChat = async (req, res) => {
  try {
    const { propertyId, userId, currentUserId } = req.body; // currentUserId is the tenant's ID
    const chat = await Chat.findOne({
      property: propertyId,
      participants: {
        $all: [
          mongoose.Types.ObjectId(userId),
          mongoose.Types.ObjectId(currentUserId),
        ],
      },
    });
    if (!chat) {
      const newChat = new Chat({
        property: propertyId,
        participants: [
          mongoose.Types.ObjectId(currentUserId),
          mongoose.Types.ObjectId(userId),
        ], // currentUserId is the tenant's ID
        messages: [],
      });
      await newChat.save();
      return res.json(newChat);
    }
    res.json(chat);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { chatId, content, receiverId, senderId } = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).send("Chat not found");
    }
    const message = {
      sender: mongoose.Types.ObjectId(senderId), // sender is the logged-in user
      receiver: mongoose.Types.ObjectId(receiverId), // receiver is the other participant
      content,
      timestamp: new Date(),
    };
    chat.messages.push(message);
    await chat.save();
    res.json(chat);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getChatById = async (req, res) => {
  try {
    const { currentUserId } = req.query;
    const chat = await Chat.findById(req.params.chatId)
      .populate("participants")
      .populate("messages.sender")
      .populate("messages.receiver");
    res.json({ chat, currentUserId });
  } catch (error) {
    res.status(500).send(error);
  }
};
