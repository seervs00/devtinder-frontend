import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios"
const Chat = () => {
  const user = useSelector((store) => store.user);
  const { targetId } = useParams();
  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);
  const socketRef = useRef(null); // 👉 store socket here

  const fetchMessages = async () => {
    try {
      const chat = await axios.get(`http://localhost:5170/chat/${targetId}`, {
        withCredentials: true,
      });
  
      const Messages = chat?.data?.messages.map((msg) => {
        const { senderId, text, _id } = msg;
        const sender = senderId?._id === userId ? "me" : "them";
        return {
          id: _id,
          text,
          sender,
          name: sender === "me" ? "You" : senderId?.firstName,
        };
      });
  
      setMessages(Messages);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };
  
  useEffect(() => {
    if (userId && targetId) {
      fetchMessages();
    }
  }, [userId, targetId]);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Create socket connection on mount
  useEffect(() => {
    if (!userId || !targetId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", { userId, targetId });

    socket.on("messageReceived", ({ firstName, text,userId: senderId }) => {
        const sender = senderId === userId ? "me" : "them";
        const newMsg = {
          id: Date.now(),
          text,
          sender,
          name: sender === "me" ? "You" : firstName,
        };
        setMessages((prev) => [...prev, newMsg]);
      });
      

    return () => {
      socket.disconnect();
    };
  }, [userId, targetId]);

  // Send a message
  const sendMessage = () => {
    if (!newMessage.trim()) return;
  
    socketRef.current?.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetId,
      text: newMessage,
    });
  
    setNewMessage("");
  };
  

  return (
    <div className="max-w-[600px] w-full mx-auto h-[700px] flex flex-col border rounded-box shadow bg-base-100 m-16">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat ${msg.sender === "me" ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-header text-sm text-gray-500">{msg.name}</div>
            <div
              className={`chat-bubble whitespace-pre-wrap break-words max-w-xs sm:max-w-sm md:max-w-md ${
                msg.sender === "me"
                  ? "chat-bubble-primary"
                  : "chat-bubble-secondary"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t flex items-center gap-2">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
