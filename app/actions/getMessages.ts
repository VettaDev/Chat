import prisma from "@/app/libs/prismadb";

export const getMessages = async (conversationId: string) => {
    try {
        const messages = await prisma.message.findMany({
            where: {
                conversationId: conversationId,
            },
            include: {
                sender: true,
                seenBy: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });
        return messages;
    } catch (err) {
        console.log(err);
        return [];
    }
};
