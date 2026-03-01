import { useRoomAction } from "@/hooks/use-room-actions";
import RoomChat from "./room-chat";

interface Props {
  handleClickRoomId: (id: string) => void;
  activeRoomId?: string;
  onDeleteRoom?: (roomId: string) => void;
}

const ListRoomChat = ({ handleClickRoomId, activeRoomId, onDeleteRoom }: Props) => {
  const { rooms, deleteRoom } = useRoomAction();

  const handleDelete = async (roomId: string) => {
    await deleteRoom(roomId);
    onDeleteRoom?.(roomId);        // avisa al padre
  };

  return (
    <div className="divide-y">
      {rooms.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">
          No tienes conversaciones aún
        </p>
      ) : (
        rooms.map((room) => (
          <RoomChat
            key={room.id}
            room={room}
            handleClickRoomId={handleClickRoomId}
            isActive={room.id === activeRoomId}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};
export default ListRoomChat;