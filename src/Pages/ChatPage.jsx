import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const AIChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  // Scroll to bottom when messages update
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // User message
    const userMsg = { id: Date.now(), text: newMessage, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    setNewMessage("");

    try {
      // Send message to backend API
      const response = await axios.post(
        "http://localhost:5000/aiChat",
        {
          message: newMessage,
        }
      );

      const botMsg = {
        id: Date.now() + 1,
        text: response.data.reply,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Frontend Error:", err.response?.data || err.message);
      const errorMsg = {
        id: Date.now() + 2,
        text: err.response?.data?.error || "Bot error. Try again.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg flex flex-col h-[600px]">
      <h2 className="text-2xl font-bold mb-4">AI ChatBot</h2>

      <div className="flex-1 overflow-y-auto mb-4 space-y-2 p-2 border rounded-lg bg-gray-50">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center mt-4">
            Say hi to your AI chatbot!
          </p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-md max-w-[70%] ${
              msg.sender === "user"
                ? "bg-amber-200 self-end ml-auto"
                : "bg-gray-200 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSend} className="flex space-x-2">
        <input
          type="text"
          className="flex-1 border rounded-lg p-2"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-amber-500 text-white px-4 rounded-lg hover:bg-amber-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default AIChatPage;
