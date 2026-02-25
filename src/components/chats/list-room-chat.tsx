import { useRoomAction } from "@/hooks/use-room-actions";
import RoomChat from "./room-chat";

interface Props {
  handleClickRoomId: (id: string) => void;
  activeRoomId?: string;
}

const ListRoomChat = ({ handleClickRoomId, activeRoomId }: Props) => {
  const { rooms, deleteRoom } = useRoomAction();

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
            onDelete={deleteRoom}
          />
        ))
      )}
    </div>
  );
};
export default ListRoomChat;