import { useMessageActions } from "@/hooks/use-message-actions";
import MessageChat from "./message-chat-";
import { useEffect, useRef } from "react";

interface Props {
  roomId: string;
}

const MessagesChat = ({ roomId }: Props) => {
  const { messages, deleteMessage } = useMessageActions(roomId);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col gap-2 p-4">
      {messages.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No hay mensajes aún. ¡Envía el primero!
        </p>
      )}
      {messages.map((message) => (
        <MessageChat key={message.id} message={message} onDelete={deleteMessage} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
export default MessagesChat;