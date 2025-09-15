import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hi! I'm Amit's assistant. How can I help you today?" }]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user's message
    setMessages([...messages, { sender: "user", text: input }]);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", { message: input });
      const botReply = res.data.reply;

      setMessages(prev => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: "bot", text: "Oops! Something went wrong." }]);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col max-w-md mx-auto p-4 border rounded-2xl shadow-lg bg-white">
      <h2 className="text-lg font-bold mb-3">Chat with Amit's Assistant 🤖</h2>
      <div className="flex flex-col gap-2 overflow-y-auto h-64 border p-2 rounded-md bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-2 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-black self-start'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex mt-3 gap-2">
        <input
          className="flex-1 p-2 border rounded-md"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
