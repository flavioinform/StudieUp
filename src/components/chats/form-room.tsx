import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRoomAction } from "@/hooks/use-room-actions";
import { toast } from "sonner";
import { findFriendSchema, type FindFriendSchemaType } from "@/lib/zod";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useFirestore } from "reactfire";

interface Props {
    handleClickRoomId: (id: string) => void;
}

const FormRoom = ({ handleClickRoomId }: Props) => {
    const db = useFirestore();
    const { findOrCreateRoom } = useRoomAction();
    const [isPending, startTransition] = useTransition();
    const [emails, setEmails] = useState<string[]>([]);

    const form = useForm<FindFriendSchemaType>({
        resolver: zodResolver(findFriendSchema),
        defaultValues: {
            email: "",
        },
    });

    // Add email to the list (tag)
    function handleAddEmail(values: FindFriendSchemaType) {
        const email = values.email.toLowerCase();
        if (emails.includes(email)) {
            toast.error("Email ya agregado");
            return;
        }
        setEmails((prev) => [...prev, email]);
        form.reset();
    }

    // Remove email tag
    function removeEmail(email: string) {
        setEmails((prev) => prev.filter((e) => e !== email));
    }

    // Create room with all emails
    function handleCreateRoom() {
        startTransition(async () => {
            try {
                // If no tags, use the current input value as a single contact
                const emailsToSearch =
                    emails.length > 0 ? emails : form.getValues("email") ? [form.getValues("email").toLowerCase()] : [];

                if (emailsToSearch.length === 0) {
                    toast.error("Agrega al menos un email");
                    return;
                }

                const uids: string[] = [];
                const notFound: string[] = [];

                for (const email of emailsToSearch) {
                    const usersRef = collection(db, "users");
                    const q = query(usersRef, where("email", "==", email));
                    const snapshot = await getDocs(q);

                    if (snapshot.empty) {
                        notFound.push(email);
                    } else {
                        uids.push(snapshot.docs[0].id);
                    }
                }

                if (notFound.length > 0) {
                    toast.error(`No encontrados: ${notFound.join(", ")}`);
                    return;
                }

                const res = await findOrCreateRoom(uids);

                if (!res.success) {
                    toast.error(res.message);
                    return;
                }

                toast.success(res.message);
                handleClickRoomId(res.roomId);
                setEmails([]);
                form.reset();
            } catch (error) {
                console.error(error);
                toast.error("Error al crear la sala");
            }
        });
    }

    return (
        <div className="space-y-2">
            {/* Email tags */}
            {emails.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {emails.map((email) => (
                        <span
                            key={email}
                            className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-medium"
                        >
                            {email}
                            <button
                                type="button"
                                onClick={() => removeEmail(email)}
                                className="hover:text-destructive transition-colors"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {/* Input row */}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleAddEmail)}
                    className="flex gap-2"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Email del contacto..."
                                        className="h-9 text-sm"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        variant="outline"
                        size="sm"
                        className="h-9 px-3"
                        title="Agregar email"
                    >
                        +
                    </Button>
                </form>
            </Form>

            {/* Create room button */}
            {emails.length > 0 && (
                <Button
                    onClick={handleCreateRoom}
                    disabled={isPending}
                    size="sm"
                    className="w-full h-8 text-xs"
                >
                    {isPending
                        ? "Creando..."
                        : emails.length > 1
                            ? `Crear grupo (${emails.length} personas)`
                            : "Iniciar chat"}
                </Button>
            )}
        </div>
    );
};
export default FormRoom;