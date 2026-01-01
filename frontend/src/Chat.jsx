import { useState } from "react";
import axios from "axios";

export default function Chat({ documentId }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!question.trim()) return;

    const userMsg = { sender: "user", text: question };
    setMessages(prev => [...prev, userMsg]);
    setQuestion("");

    try {
      setLoading(true);

      const res = await axios.post("https://pdf-chat-lite-d5oy.onrender.com/api/ask", 
        {
        documentId,
        question
      });

      const botMsg = { sender: "bot", text: res.data.answer };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      setMessages(prev => [...prev, { sender: "bot", text: "Error occurred" }]);
    }

    setLoading(false);
  };

  return (
    <div className="card chat-card">
      <h2>Chat</h2>

      <div className="chat-box">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`msg ${m.sender === "user" ? "user" : "bot"}`}
          >
            {m.text}
          </div>
        ))}

        {loading && <p className="thinking">Thinking...</p>}
      </div>

      <div className="input-row">
        <input
          className="input"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Ask something..."
        />
        <button className="btn" onClick={ask}>Ask</button>
      </div>
    </div>
  );
}
