import { Suspense, useState } from "react";

import FormChat from "@/components/chats/form-chat";
import FormRoom from "@/components/chats/form-room";
import ListRoomChat from "@/components/chats/list-room-chat";
import MessagesChat from "@/components/chats/messages-chat";
import { useMessageActions } from "@/hooks/use-message-actions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ChatPage = () => {
  const [roomId, setRoomId] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleClickRoomId = (id: string) => {
    setRoomId(id);
    setShowChat(true);
  };

  const handleBack = () => {
    setShowChat(false);
  };

  // Agrega esta función junto a handleBack (línea ~25)
  const handleDeleteRoom = (deletedId: string) => {
    if (roomId === deletedId) {
      setRoomId("");
      setShowChat(false);
    }
  };


  return (
    <div className="h-[calc(100vh-5rem)] flex gap-3">
      {/* Sidebar - room list */}
      <Card
        className={`w-full md:w-80 md:min-w-80 flex-shrink-0 flex flex-col gap-0 py-0 overflow-hidden ${showChat ? "hidden md:flex" : "flex"
          }`}
      >
        <CardHeader className="border-b px-4 py-3">
          <CardTitle className="text-lg">Chat</CardTitle>
        </CardHeader>
        <CardContent className="px-3 py-3">
          <Suspense
            fallback={
              <div className="text-sm text-muted-foreground p-2">
                Cargando...
              </div>
            }
          >
            <FormRoom handleClickRoomId={handleClickRoomId} />
          </Suspense>
        </CardContent>
        <div className="flex-1 overflow-y-auto px-1">
          <Suspense
            fallback={
              <div className="text-sm text-muted-foreground p-4">
                Cargando salas...
              </div>
            }
          >
            <ListRoomChat
              handleClickRoomId={handleClickRoomId}
              activeRoomId={roomId}
              onDeleteRoom={handleDeleteRoom}
            />
          </Suspense>
        </div>
      </Card>

      {/* Chat area */}
      <Card
        className={`flex-1 flex flex-col gap-0 py-0 overflow-hidden ${showChat ? "flex" : "hidden md:flex"
          }`}
      >
        {roomId ? (
          <ChatSection
            roomId={roomId}
            onBack={handleBack}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-12 w-12 opacity-40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="text-sm">Selecciona una sala para chatear</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

/** Sub-component for the active chat */
const ChatSection = ({
  roomId,
  onBack,
}: {
  roomId: string;
  onBack: () => void;
}) => {
  const { sendMessage } = useMessageActions(roomId);

  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
          Cargando mensajes...
        </div>
      }
    >
      {/* Chat header with back button on mobile */}
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={onBack}
        >
          ← Volver
        </Button>
        <h3 className="text-sm font-medium text-muted-foreground">
          Conversación
        </h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <MessagesChat roomId={roomId} />
      </div>

      {/* Input */}
      <div className="border-t px-4 py-3">
        <FormChat sendMessage={sendMessage} />
      </div>
    </Suspense>
  );
};

export default ChatPage;
