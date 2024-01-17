import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";

const useRoutes = () => {
    const pathName = usePathname();
    const { conversationId } = useConversation();
    const routes = useMemo(
        () => [
            {
                href: "/conversations",
                icon: HiChat,
                label: "Chat",
                active: pathName === "/conversations" || !!conversationId,
            },
            {
                href: "/users",
                icon: HiUsers,
                label: "Users",
                active: pathName === "/users",
            },
            {
                href: "/",
                icon: HiArrowLeftOnRectangle,
                label: "Logout",
                onClick: () => signOut(),
            },
        ],
        [pathName, conversationId],
    );
    return routes;
};
export default useRoutes;
