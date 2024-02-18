import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

interface IParams {
    conversationId: string;
}
export async function DELETE(req: Request, { params }: { params: IParams }) {
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            new NextResponse("Unauthorized", { status: 401 });
        }
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                users: true,
            },
        });
        if (!conversation) {
            new NextResponse("Invalid ID", { status: 400 });
        }
        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id],
                },
            },
        });
        conversation?.users.forEach((user) => {
            if (user.email) {
                pusherServer.trigger(
                    user.email,
                    "conversation:delete",
                    conversation,
                );
            }
        });
        return NextResponse.json(deletedConversation);
    } catch (err: any) {
        console.log(err, "ERROR_MESSAGE_SEEN");
        new NextResponse("Internal Server Error", { status: 500 });
    }
}
{
}
