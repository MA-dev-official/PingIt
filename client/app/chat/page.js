import dynamic from "next/dynamic";

const ChatClient = dynamic(() => import("@/components/ChatClient"), {
  ssr: false,
});

export default function Page() {
  return <ChatClient />;
}