"use client";

import useRoutes from "@/app/hooks/useRoutes";
import { FC, useState } from "react";
import DesktopSidebarItem from "./components/DesktopSidebarItem";
import { User } from "@prisma/client";
import { Avatar } from "../Avatar";
import SettingsModal from "./components/SettingsModal";

interface DesktopSidebarProps {
    currentUser: User;
}

export const DesktopSidebar: FC<DesktopSidebarProps> = ({ currentUser }) => {
    const routes = useRoutes();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <SettingsModal
                currentUser={currentUser}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <div className="hidden lg:flex lg:flex-col lg:justify-between lg:fixed lg:inset-y-0 lg:left-0 lg:z-40  lg:w-20 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 xl:px-6">
                <nav className="flex flex-col justify-between mt-4">
                    <ul
                        role="list"
                        className="flex flex-col items-center space-y-1"
                    >
                        {routes.map((route) => (
                            <DesktopSidebarItem
                                key={route.label}
                                href={route.href}
                                label={route.label}
                                icon={route.icon}
                                active={route.active}
                                onClick={route.onClick}
                            />
                        ))}
                    </ul>
                </nav>
                <nav className="mt-4 flex flex-col justify-between items-center ">
                    <div
                        className="cursor-pointer hover:opacity-75 transition"
                        onClick={() => setIsOpen(true)}
                    >
                        <Avatar user={currentUser} />
                    </div>
                </nav>
            </div>
        </>
    );
};
