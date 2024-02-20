"use client";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

interface AuthContextProps {
    children: React.ReactNode;
}
export default function AuthContext({ children }: AuthContextProps) {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("../../public/service-worker.js")
                .then((registration) =>
                    console.log("scope is: ", registration.scope),
                );
        }
    }, []);
    return <SessionProvider>{children}</SessionProvider>;
}
