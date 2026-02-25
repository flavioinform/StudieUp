import type { UserFirestore } from "@/schemas/user.schema";
import { doc } from "firebase/firestore";
import { useFirestore, useFirestoreDocData } from "reactfire";

export const useFriendInfo = (friendUID: string) => {
  const db = useFirestore();

  const friendDocRef = doc(db, "users", friendUID);

  const { data: friend } = useFirestoreDocData(friendDocRef, {
    idField: "uid",
    suspense: true,
  });

  return {
    friend: friend as UserFirestore,
  };
};