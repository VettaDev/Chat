"use client";

import EmptyState from "@/app/components/EmptyState";
import useConversation from "@/app/hooks/useConversation";

import clsx from "clsx";

const Home = () => {
    const { isOpen } = useConversation();
    return (
        <div
            className={clsx(
                "lg:pl-80 h-full lg:block",
                isOpen ? "hidden" : "block",
            )}
        >
            <EmptyState />
        </div>
    );
};

export default Home;
