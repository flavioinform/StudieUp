import type { Room } from "@/schemas/room.schema";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
  CollectionReference,
} from "firebase/firestore";
import {
  useFirestore,
  useFirestoreCollectionData,
  useUser,
} from "reactfire";

export const useRoomAction = () => {
  const db = useFirestore();
  const { data: user } = useUser();

  if (!user) throw new Error("Usuario no encontrado");

  const roomRefer = collection(
    db,
    "rooms"
  ) as CollectionReference<Room>;

  const roomQuery = query(
    roomRefer,
    where("participants", "array-contains", user.uid)
  );

  const { data: rooms = [] } = useFirestoreCollectionData(
    roomQuery,
    {
      suspense: true,
      idField: "id",
    }
  );

  const findOrCreateRoom = async (participantUIDs: string[]) => {
    const participants = Array.from(
      new Set([...participantUIDs, user.uid])
    );

    const type: Room["type"] =
      participants.length > 2 ? "group" : "private";

    const existRoom = rooms.find((room) => {
      if (room.participants.length !== participants.length)
        return false;

      return participants.every((uid) =>
        room.participants.includes(uid)
      );
    });

    if (existRoom)
      return {
        success: true,
        message: "Ya existe la sala",
        roomId: existRoom.id,
      };

    const newRoom: Omit<Room, "id"> = {
      type,
      createdAt: serverTimestamp(),
      lastMessage: null,
      participants,
    };

    const document = await addDoc(roomRefer, newRoom);

    return {
      success: true,
      message: "Sala creada",
      roomId: document.id,
    };
  };

  const deleteRoom = async (targetRoomId: string) => {
    // 1. Borrar todos los mensajes de la subcolección
    const messagesRef = collection(db, "rooms", targetRoomId, "messages");
    const snapshot = await getDocs(messagesRef);
    const deletePromises = snapshot.docs.map((d) => deleteDoc(d.ref));
    await Promise.all(deletePromises);

    // 2. Borrar el room
    const roomDoc = doc(db, "rooms", targetRoomId);
    await deleteDoc(roomDoc);
  };

  return {
    rooms,
    findOrCreateRoom,
    deleteRoom,
  };
};
