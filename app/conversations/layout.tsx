import React from "react";
import Menu from "../components/Menu";
import { ConversationList } from "./components/ConversationList";
import { getConversations } from "../actions/getConversations";

export default async function ConversationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const conversatios = await getConversations();
    return (
        //@ts-expect-error Server Component
        <Menu>
            <div className="h-full">
                <ConversationList initialItems={conversatios}>
                    {children}
                </ConversationList>
            </div>
        </Menu>
    );
}
