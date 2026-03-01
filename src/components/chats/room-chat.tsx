import type { Room } from "@/schemas/room.schema";
import { Trash2 } from "lucide-react";
import { Suspense } from "react";
import { useUser } from "reactfire";
import FriendEmail from "./friend-email";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface Props {
  room: Room;
  handleClickRoomId: (id: string) => void;
  isActive?: boolean;
  onDelete?: (roomId: string) => void;
}

const RoomChat = ({
  room,
  handleClickRoomId,
  isActive,
  onDelete,
}: Props) => {
  const { data: user } = useUser();

  const isGroup = room.type === "group";
  const friendUID =
    room.participants.find((uid) => uid !== user?.uid) || "";

  const avatarLabel = isGroup
    ? `G${room.participants.length}`
    : friendUID.slice(0, 2).toUpperCase();

  return (
    <div
      className={`group w-full flex items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-accent/50 cursor-pointer ${
        isActive ? "bg-accent" : ""
      }`}
      onClick={() => handleClickRoomId(room.id)}
    >
      {/* Avatar */}
      <div
        className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
          isGroup
            ? "bg-emerald-500/15 text-emerald-600"
            : "bg-primary/10 text-primary"
        }`}
      >
        {avatarLabel}
      </div>

      {/* Nombre */}
      <span className="text-sm truncate flex-1">
        {isGroup ? (
          <span>Grupo ({room.participants.length})</span>
        ) : (
          <Suspense
            fallback={
              <span className="text-muted-foreground">
                Cargando...
              </span>
            }
          >
            <FriendEmail friendUID={friendUID} />
          </Suspense>
        )}
      </span>

      {/* Delete Dialog */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {/* IMPORTANTE: usar div, NO button */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex-shrink-0 p-1.5 rounded-md opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all cursor-pointer"
            title="Eliminar conversación"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </div>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Eliminar este chat?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El chat será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={(e) => e.stopPropagation()}
            >
              Cancelar
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(room.id);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RoomChat;