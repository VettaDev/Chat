"use client";

import { Avatar } from "@/app/components/Avatar";
import { useOtherUser } from "@/app/hooks/useOtherUsers";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import AvatarGroup from "@/app/components/AvatarGroup";
import SecondaryText from "@/app/components/SecondaryText";
import PrimaryText from "@/app/components/PrimaryText";

interface ConversationItemProps {
    data: FullConversationType;
    selected?: boolean;
}
export const ConversationItem: React.FC<ConversationItemProps> = ({
    data,
    selected,
}) => {
    const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`);
    }, [data.id, router]);

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];
        return messages[messages.length - 1];
    }, [data.messages]);

    const userEmail = useMemo(() => {
        return session?.data?.user?.email;
    }, [session?.data?.user?.email]);

    const hasSeen = useMemo(() => {
        if (!lastMessage || !userEmail) return false;

        const seenArray = lastMessage.seenBy || [];
        return seenArray.filter((user) => user.email === userEmail).length > 0;
    }, [userEmail, lastMessage]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) return "Sent an image";
        if (lastMessage?.body) return lastMessage.body;
        return "Start a conversation";
    }, [lastMessage?.body, lastMessage?.image]);

    return (
        <div
            className={clsx(
                `w-full relative flex items-center space-x-3 p-3 hover:bg-neutral-100 cursor-pointer rounded-lg transition`,
                selected ? "bg-neutral-100" : "bg-white",
            )}
            onClick={handleClick}
        >
            {data.isGroup ? (
                <AvatarGroup users={data.users} />
            ) : (
                <Avatar user={otherUser} />
            )}

            <div className="focus:outline-none flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                    {data.name ||
                        (otherUser.name && (
                            <PrimaryText text={data.name || otherUser.name} />
                        ))}
                    {lastMessage && (
                        <SecondaryText
                            text={format(new Date(lastMessage.createdAt), "p")}
                        />
                    )}
                </div>
                <p
                    className={clsx(
                        `truncate text-sm`,
                        hasSeen ? "text-gray-500" : "text-black font-medium",
                    )}
                >
                    {lastMessageText}
                </p>
            </div>
        </div>
    );
};
