"use client";
import { Avatar } from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import PreviewImageModal from "./PreviewImageModal";

interface MessageItemProps {
    data: FullMessageType;
    isLast?: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ isLast, data }) => {
    const session = useSession();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isOwn = session?.data?.user?.email === data.sender.email;
    const seenList = (data.seenBy || [])
        .filter((user) => user.email !== data?.sender?.email)
        .map((user) => user.name)
        .join(", ");

    const container = clsx("flex gap-3 p-4", isOwn && "justify-end");

    const avatar = clsx(isOwn && "order-2");

    const body = clsx("flex flex-col gap-2", isOwn && "items-end");

    const message = clsx(
        "text-sm w-fit overflow-hidden",
        isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
        data.image ? "rounded-md p-0" : "rounded-full py-2 px-3",
    );
    const messageData = new Date(data.createdAt);
    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={data?.sender} />
            </div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        {data.sender.name}
                    </div>
                    <div className="text-xs text-gray-400">
                        {format(messageData, "p")}
                    </div>
                </div>
                <div className={message}>
                    <PreviewImageModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        src={""}
                    />
                    {data.image ? (
                        <Image
                            onClick={() => setIsModalOpen(true)}
                            src={data.image}
                            width={200}
                            height={200}
                            alt="Image"
                            className="object-cover cursor-pointer hover:scale-110 transition translate"
                        />
                    ) : (
                        <div>{data.body}</div>
                    )}
                </div>
                {isLast && isOwn && seenList.length > 0 && (
                    <div className="text-xs font-light text-gray-500">{`Seen by ${seenList}`}</div>
                )}
            </div>
        </div>
    );
};

export default MessageItem;
