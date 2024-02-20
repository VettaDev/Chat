"use client";
import { Avatar } from "@/app/components/Avatar";
import { useOtherUser } from "@/app/hooks/useOtherUsers";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";
import ActionIcon from "@/app/components/ActionIcon";
import SecondaryText from "@/app/components/SecondaryText";
import PrimaryText from "@/app/components/PrimaryText";

interface HeaderProps {
    conversation: Conversation & {
        users: User[];
    };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
    const otherUser = useOtherUser(conversation);
    const [drawerOpen, setDrowerOpen] = useState<boolean>(false);
    const { members } = useActiveList();
    const isActive = members.indexOf(otherUser.email!) !== -1;

    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`;
        }
        return isActive ? "active" : "offline";
    }, [conversation, isActive]);

    return (
        <>
            <ProfileDrawer
                isOpen={drawerOpen}
                data={conversation}
                onClose={() => setDrowerOpen(false)}
            />
            <div className="bg-white w-full flex justify-between border-b-[1px] border-gray-200 py-3 lg:px-6 items-center shadow-sm ">
                <div className="flex gap-3 items-center">
                    <Link
                        href="/conversations"
                        className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
                    >
                        <HiChevronLeft size={32} />
                    </Link>
                    {conversation.isGroup ? (
                        <AvatarGroup users={conversation.users} />
                    ) : (
                        <Avatar user={otherUser} />
                    )}
                    <div className="flex flex-col">
                        {conversation.name ||
                            (otherUser.name && (
                                <PrimaryText
                                    text={conversation.name || otherUser.name}
                                />
                            ))}
                        {!isActive && <SecondaryText text={statusText} />}
                    </div>
                </div>
                <ActionIcon
                    onClick={() => setDrowerOpen(true)}
                    icon={
                        <HiEllipsisHorizontal
                            size={32}
                            className="text-sky-500 hover:text-sky-600 cursor-pointer transition"
                        />
                    }
                />
            </div>
        </>
    );
};

export default Header;
