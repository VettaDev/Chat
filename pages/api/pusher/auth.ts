import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { pusherServer } from "@/app/libs/pusher";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const session = getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
        res.status(401).end();
        return;
    }
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const data = {
        user_id: session.user.email,
    };
    const authResponse = pusherServer.authorizeChannel(socketId, channel, data);
    return res.send(authResponse);
}