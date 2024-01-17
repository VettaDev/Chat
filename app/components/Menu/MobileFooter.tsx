"use client";

import useRoutes from "@/app/hooks/useRoutes";
import useConversation from "@/app/hooks/useConversation";
import MobileFooterItem from "./components/MobileFooterItem";

export const MobileFooter = () => {
    const routes = useRoutes();
    const { isOpen } = useConversation();

    if (isOpen) {
        return null;
    }

    return (
        <ul
            role="list"
            className="lg:hidden flex flex-row justify-around items-center space-y-1 w-full  fixed bottom-0 z-40 bg-white border-t-[1px]"
        >
            {routes.map((route) => (
                <MobileFooterItem
                    key={route.label}
                    href={route.href}
                    icon={route.icon}
                    active={route.active}
                    onClick={route.onClick}
                />
            ))}
        </ul>
    );
};
