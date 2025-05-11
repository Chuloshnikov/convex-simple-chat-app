import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";
import { faker } from "@faker-js/faker"; // Убедись, что установлен faker

export default function App() {
  const messages = useQuery(api.chat.listMessages); 
  const sendMessage = useMutation(api.chat.sendMessage);

  const [newMessageText, setNewMessageText] = useState("");
  const [name] = useState(getOrSetFakeName()); // 👈 Инициализируем имя один раз

  return (
    <main className="chat">
      <div className="messages">
        {messages?.map((msg) => (
          <div key={msg._id}>
            <strong>{msg.user}</strong>: {msg.body}
          </div>
        ))}
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await sendMessage({ user: name, body: newMessageText }); // 👈 Используем name
          setNewMessageText("");
        }}
      >
        <input
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}

function getOrSetFakeName() {
  const NAME_KEY = "tutorial_name";
  const existing = sessionStorage.getItem(NAME_KEY);
  if (existing) return existing;

  const newName = faker.person.firstName();
  sessionStorage.setItem(NAME_KEY, newName);
  return newName;
}