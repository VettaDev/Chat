import { getConversations } from "@/app/actions/getConversations";
import { getUsers } from "@/app/actions/getUsers";
import Menu from "@/app/components/Menu";
import { ConversationList } from "./components/ConversationList";

export default async function ConversationsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const conversations = await getConversations();
    const users = await getUsers();

    return (
        // @ts-expect-error Server Component
        <Menu>
            <div className="h-full">
                <ConversationList
                    users={users}
                    // title="Messages"
                    initialItems={conversations}
                />
                {children}
            </div>
        </Menu>
    );
}
