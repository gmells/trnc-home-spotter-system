import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new Schema({
  property: { type: Schema.Types.ObjectId, ref: "Property", required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  messages: [messageSchema],
});

export default mongoose.model("Chat", chatSchema);
