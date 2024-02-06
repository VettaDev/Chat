"use client";
import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import React, { use, useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import axios from "axios";
interface IContentProps {
    initialMessages: FullMessageType[];
}

const Content: React.FC<IContentProps> = ({ initialMessages }) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);
    const { conversationId } = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`);
    }, [conversationId]);

    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, index) => {
                const isLast = index === messages.length - 1;
                return (
                    <MessageItem
                        key={message.id}
                        isLast={isLast}
                        data={message}
                    />
                );
            })}
            <div ref={bottomRef} className="" pt-24 />
        </div>
    );
};

export default Content;
