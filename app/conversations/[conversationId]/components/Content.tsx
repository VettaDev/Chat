"use client";
import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import React, { use, useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";
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

    useEffect(() => {
        pusherClient.subscribe(conversationId);
        bottomRef?.current?.scrollIntoView();

        const messageHandler = (message: FullMessageType) => {
            axios.post(`/api/conversations/${conversationId}/seen`);

            setMessages((current) => {
                if (find(current, { id: message.id })) {
                    return current;
                }
                return [...current, message];
            });
            bottomRef?.current?.scrollIntoView();
        };

        const updateMessageHandler = (newMessage: FullMessageType) => [
            setMessages((current) =>
                current.map((currentMessage) => {
                    if (currentMessage.id === newMessage.id) {
                        return newMessage;
                    }
                    return currentMessage;
                }),
            ),
        ];

        pusherClient.bind("messages:new", messageHandler);
        pusherClient.bind("message:update", updateMessageHandler);

        return () => {
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind("messages:new", messageHandler);
            pusherClient.unbind("message:update", updateMessageHandler);
        };
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
            <div ref={bottomRef} className="pt-24" />
        </div>
    );
};

export default Content;
