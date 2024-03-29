import prisma from "@/app/libs/prismadb";
import { get } from "lodash";
import { getCurrentUser } from "./getCurrentUser";

export const getConversations = async () => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return [];
        }

        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: "desc",
            },
            where: {
                userIds: {
                    has: currentUser.id,
                },
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seenBy: true,
                    },
                },
            },
        });

        return conversations;
    } catch (err) {
        console.log(err);
        return [];
    }
};
