import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function ViewChat() {
  const { chatId } = useParams();
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  console.log("1" + currentUser._id);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await axios.get(`/api/chat/${chatId}`, {
          params: { currentUserId: currentUser._id },
        });
        setChat(response.data.chat);
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };
    fetchChat();
  }, [chatId, currentUser._id]);

  const sendMessage = async () => {
    try {
      if (chat && chat.participants) {
        console.log("Participants:", chat.participants);

        const receiver = chat.participants.find(
          (participant) => participant._id !== currentUser._id
        );
        console.log(receiver);

        if (!receiver) {
          console.error("Receiver ID not found");
          return;
        }

        await axios.post("/api/chat/message", {
          chatId,
          content: message,
          senderId: currentUser._id,
          receiverId: receiver._id, // Ensure correct receiver ID
        });
        setMessage("");

        const response = await axios.get(`/api/chat/${chatId}`, {
          params: { currentUserId: currentUser._id },
        });
        setChat(response.data.chat);
      } else {
        console.error("Chat participants not found");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-col flex-auto h-full p-6">
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
          <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full">
              <div className="grid grid-cols-12 gap-y-2">
                {chat &&
                  chat.messages &&
                  chat.messages.map((message) => {
                    const isSender = message.senderId === currentUser._id;
                    return isSender ? (
                      <div
                        key={message._id}
                        className="col-start-1 col-end-8 p-3 rounded-lg"
                      >
                        <div className="flex flex-row items-center justify-end">
                          <div className="relative ml-3 text-sm bg-blue-500 text-white py-2 px-4 shadow rounded-xl">
                            <div>{message.content}</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        key={message._id}
                        className="col-start-6 col-end-13 p-3 rounded-lg"
                      >
                        <div className="flex flex-row items-center">
                          <div className="relative ml-3 text-sm bg-gray-200 text-gray-700 py-2 px-4 shadow rounded-xl">
                            <div>{message.content}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border rounded-xl p-4"
                    placeholder="Type your message..."
                  />
                </div>
              </div>
              <div className="ml-4">
                <button
                  type="submit"
                  className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ViewChat;
