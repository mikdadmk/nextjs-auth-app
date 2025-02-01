"use client";
import { useState, useEffect } from "react";

export default function MessagesList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch("/api/messages");
        if (!res.ok) throw new Error("Failed to fetch messages.");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading messages...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Messages</h2>
      {messages.length === 0 ? (
        <p className="text-gray-600">No messages yet.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg, index) => (
            <li key={index} className="p-4 border rounded-lg shadow-sm">
              <p className="text-gray-900 font-bold">{msg.username}</p>
              <p className="text-gray-600 text-sm">{msg.email}</p>
              <p className="mt-2 text-gray-700">{msg.message}</p>
              <p className="text-gray-400 text-xs mt-1">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
