import type { Room } from "@/schemas/room.schema";
import { Trash2 } from "lucide-react";
import { Suspense, useState } from "react";
import { useUser } from "reactfire";
import FriendEmail from "./friend-email";

interface Props {
  room: Room;
  handleClickRoomId: (id: string) => void;
  isActive?: boolean;
  onDelete?: (roomId: string) => void;
}

const RoomChat = ({ room, handleClickRoomId, isActive, onDelete }: Props) => {
  const { data: user } = useUser();
  const [confirming, setConfirming] = useState(false);

  const isGroup = room.type === "group";
  const friendUID = room.participants.find((uid) => uid !== user?.uid) || "";

  const avatarLabel = isGroup
    ? `G${room.participants.length}`
    : friendUID.slice(0, 2).toUpperCase();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    onDelete?.(room.id);
  };

  return (
    <div
      className={`group w-full flex items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-accent/50 cursor-pointer ${isActive ? "bg-accent" : ""}`}
      onClick={() => handleClickRoomId(room.id)}
    >
      {/* Avatar circle */}
      <div
        className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${isGroup
          ? "bg-emerald-500/15 text-emerald-600"
          : "bg-primary/10 text-primary"
          }`}
      >
        {avatarLabel}
      </div>

      {/* Name */}
      <span className="text-sm truncate flex-1">
        {isGroup ? (
          <span>
            Grupo ({room.participants.length})
          </span>
        ) : (
          <Suspense
            fallback={
              <span className="text-muted-foreground">Cargando...</span>
            }
          >
            <FriendEmail friendUID={friendUID} />
          </Suspense>
        )}
      </span>

      {/* Delete button */}
      <button
        type="button"
        onClick={handleDelete}
        className={`flex-shrink-0 p-1.5 rounded-md transition-all ${confirming
            ? "bg-destructive/10 text-destructive opacity-100"
            : "opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          }`}
        title={confirming ? "Click de nuevo para confirmar" : "Eliminar conversación"}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
export default RoomChat;