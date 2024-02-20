"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import { ConversationItem } from "./ConversationItem";
import GroupChatModal from "./GroupChatModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";
import Title from "@/app/components/Title";
import ActionIcon from "@/app/components/ActionIcon";
import Sidebar from "@/app/components/Sidebar";

interface ConversationListProps {
    initialItems: FullConversationType[];
    users?: User[];
    children?: React.ReactNode;
}
export const ConversationList: React.FC<ConversationListProps> = ({
    initialItems,
    users,
}) => {
    const session = useSession();
    const router = useRouter();
    const [items, setItems] = useState<FullConversationType[]>(initialItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { conversationId, isOpen } = useConversation();

    const pusherKey = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email]);

    useEffect(() => {
        if (!pusherKey) return;
        const newHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                if (find(current, { id: conversation.id })) {
                    return current;
                }
                return [conversation, ...current];
            });
        };
        const updateHandler = (conversation: FullConversationType) => {
            setItems((current) =>
                current.map((currentConversation) => {
                    if (currentConversation.id === conversation.id) {
                        return {
                            ...currentConversation,
                            messages: conversation.messages,
                        };
                    }
                    return currentConversation;
                }),
            );
        };
        const deleteHandler = (conversation: FullConversationType) => {
            setItems((current) =>
                current.filter((currentConversation) => {
                    return currentConversation.id !== conversation.id;
                }),
            );
            if (conversationId === conversation.id) {
                router.push("/conversations");
            }
        };
        pusherClient.subscribe(pusherKey);
        pusherClient.bind("conversation:new", newHandler);
        pusherClient.bind("conversation:update", updateHandler);
        pusherClient.bind("conversation:delete", deleteHandler);

        return () => {
            pusherClient.unsubscribe(pusherKey);
            pusherClient.unbind("conversation:new", newHandler);
            pusherClient.unbind("conversation:update", updateHandler);
            pusherClient.unbind("conversation:delete", deleteHandler);
        };
    }, [pusherKey, conversationId, router]);

    return (
        <>
            <GroupChatModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                users={users}
            />
            <Sidebar>
                <div className="flex justify-between mb-4 pt-4 px-5">
                    <Title text={"Conversations"} />
                    <ActionIcon
                        onClick={() => setIsModalOpen(true)}
                        icon={<MdOutlineGroupAdd size={20} />}
                    />
                </div>
                {items.map((item) => (
                    <ConversationItem
                        key={item.id}
                        data={item}
                        selected={conversationId === item.id}
                    />
                ))}
            </Sidebar>
        </>
    );
};
