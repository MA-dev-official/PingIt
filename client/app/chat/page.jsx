// /app/chat/page.jsx

import { Suspense } from "react";
import ChatClient from "@/components/ChatClient";

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <ChatClient />
    </Suspense>
  );
}