"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { useForm } from "react-hook-form";

export default function Chat() {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("Connecting...");

  const socketRef = useRef(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_SERVER_URI);

    socketRef.current.on("connect", () => {
      const username = searchParams.get("username");
      if (username) {
        setName(username);
        socketRef.current.emit("setUsername", username);
        setStatus("Searching for a partner...");
      }
    });

    socketRef.current.on("matched", (data) => {
      setPartnerName(data.partnerUsername);
      setRoomId(data.roomId);
      setMessages([]);
      setConnected(true);
      setStatus(`Matched with ${data.partnerUsername}`);
    });

    socketRef.current.on("receive_message", (data) => {
      setMessages((prev) => [...prev, { sender: data.senderUsername, text: data.message }]);
    });

    socketRef.current.on("partner_disconnected", () => {
      setStatus("Partner disconnected. Click 'New Match' to continue.");
      setConnected(false);
      setPartnerName("");
      setRoomId("");
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [searchParams]);

  const onSubmit = (data) => {
    if (data.message.trim() && roomId) {
      socketRef.current.emit("send_message", { roomId, message: data.message });
      reset(); // clear input
    }
  };

  const findNewMatch = () => {
    setMessages([]);
    setPartnerName("");
    setRoomId("");
    setConnected(false);
    setStatus("Searching for new partner...");
    socketRef.current.emit("find_new_match");
  };

  return (
    <>
      <Head>
        <title>PingIt - Random Anonymous Chat</title>
        <meta name="description" content="Chat anonymously with strangers using PingIt - fast, secure, and simple!" />
        <meta name="keywords" content="anonymous chat, random chat, chat with strangers, PingIt, real-time chat app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="p-4 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-2">Chat as {name}</h2>
        <p className="mb-4">{status}</p>

        {connected && (
          <>
            <h3 className="mb-2 text-lg">
              You are chatting with <b>{partnerName}</b>
            </h3>

            <div className="h-[50vh] mb-4">
              <ScrollToBottom className="bg-white/5 border rounded p-2 mb-4 h-full overflow-y-auto">
                {messages.map((msg, index) => {
                  const isSelf = msg.sender === name;
                  return (
                    <div
                      key={index}
                      className={`flex ${isSelf ? "justify-end" : "justify-start"} mb-2`}
                    >
                      <div
                        className={`px-4 py-2 rounded-2xl max-w-[70%] shadow text-white ${
                          isSelf ? "bg-violet-600" : "bg-gray-500"
                        }`}
                      >
                        <span className="block text-xs opacity-70 mb-1">
                          {isSelf ? "You" : msg.sender}
                        </span>
                        <span>{msg.text}</span>
                      </div>
                    </div>
                  );
                })}
              </ScrollToBottom>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
              <input
                {...register("message")}
                className="border p-2 flex-1 rounded focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                placeholder="Type a message..."
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Send
              </button>
            </form>

            <button
              onClick={findNewMatch}
              className="bg-yellow-500 text-white mt-4 px-4 py-2 rounded"
            >
              🔁 New Match
            </button>
          </>
        )}

        {!connected && partnerName === "" && (
          <div className="flex justify-center mt-6">
            <button
              onClick={findNewMatch}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              🔁 New Match
            </button>
          </div>
        )}
      </div>
    </>
  );
}