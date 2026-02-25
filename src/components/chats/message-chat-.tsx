import type { Message } from "@/schemas/room.schema";
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
} from "@/components/ui/alert-dialog";

interface Props {
    message: Message;
    onDelete?: (messageId: string) => void;
}

const MessageChat = ({ message, onDelete }: Props) => {
    const { data: user } = useUser();

    const isMine = user?.uid === message.senderId;

    return (
        <div className={`group flex items-end gap-1 ${isMine ? "justify-end" : "justify-start"}`}>
            {/* Delete button with AlertDialog - only for own messages */}
            {isMine && onDelete && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button
                            type="button"
                            className="p-1 rounded transition-all mb-1 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            title="Eliminar mensaje"
                        >
                            <Trash2 className="h-3 w-3" />
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar este mensaje?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta acción no se puede deshacer. El mensaje será eliminado permanentemente.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => onDelete(message.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                Eliminar
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}

            <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 space-y-1 ${isMine
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted rounded-bl-md"
                    }`}
            >
                {/* Sender label */}
                <p
                    className={`text-[11px] font-medium ${isMine ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                >
                    {isMine ? (
                        "Tú"
                    ) : (
                        <Suspense fallback="...">
                            <FriendEmail friendUID={message.senderId} />
                        </Suspense>
                    )}
                </p>

                {/* Message text */}
                <p className="text-sm leading-relaxed break-words">{message.text}</p>
            </div>
        </div>
    );
};
export default MessageChat;