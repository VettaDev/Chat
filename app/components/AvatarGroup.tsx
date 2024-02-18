"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
interface AvatarGroupProps {
    users: User[];
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users }) => {
    const avatarUsers = users.slice(0, 3);
    const positoinMap = {
        0: "left-[12px] top-[10px] z-10",
        1: "bottom-0 left-[2px]",
        2: "bottom-0 right-[2px] z-1",
    };
    return (
        <div
            className="relative h-11 w-11
    "
        >
            {avatarUsers.map((user, index) => {
                return (
                    <div
                        key={user.id}
                        className={`absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px] ${
                            positoinMap[index as keyof typeof positoinMap]
                        }`}
                    >
                        <Image
                            src={user.image || "/images/placeholder.jpg"}
                            alt="Avatar"
                            width={21}
                            height={21}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default AvatarGroup;
