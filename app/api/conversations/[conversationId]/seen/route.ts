import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

import { NextResponse } from "next/server";

interface IParams {
    conversationId: string;
}
export async function POST(request: Request, { params }: { params: IParams }) {
    try {
        const currentUser = await getCurrentUser();
        const { conversationId } = params;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                messages: {
                    include: {
                        seenBy: true,
                    },
                },
                users: true,
            },
        });
        if (!conversation) {
            new NextResponse("Invalid ID", { status: 400 });
        }
        const lastMessage =
            conversation?.messages[conversation.messages.length - 1];

        if (!lastMessage) {
            return NextResponse.json(conversation);
        }
        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id,
            },
            data: {
                seenBy: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
            include: {
                seenBy: true,
                sender: true,
            },
        });
        return NextResponse.json(updatedMessage);
    } catch (err) {
        console.log(err, "ERROR_MESSAGE_SEEN");
        new NextResponse("Internal Server Error", { status: 500 });
    }
}
