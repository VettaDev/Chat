"use client";

import { Avatar } from "@/app/components/Avatar";
import PrimaryText from "@/app/components/PrimaryText";
import LoadingModal from "@/app/conversations/[conversationId]/components/LoadingModal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface UserProps {
    data: User;
}
export const UserItem: React.FC<UserProps> = ({ data }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleClick = useCallback(async () => {
        setIsLoading(true);
        axios
            .post("/api/conversations", {
                userId: data.id,
            })
            .then((res) => {
                router.push(`/conversations/${res.data.id}`);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [data, router]);

    return (
        <>
            {isLoading && <LoadingModal />}
            <div
                onClick={handleClick}
                className="relative w-full flex items-center space-x-3 p-3 hover:bg-neutral-100 rounded-lg cursor-pointer transition"
            >
                <Avatar user={data} />
                {data?.name && <PrimaryText text={data.name} />}
            </div>
        </>
    );
};
