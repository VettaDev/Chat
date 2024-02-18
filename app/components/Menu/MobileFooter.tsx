"use client";

import useConversation from "@/app/hooks/useConversation";
import MobileFooterItem from "./components/MobileFooterItem";
import useNavigation from "@/app/hooks/useNavigation";
import styled from "styled-components";

export const MobileFooter = () => {
    const routes = useNavigation();
    const { isOpen } = useConversation();

    if (isOpen) {
        return null;
    }

    return (
        <FooterMenu>
            {routes.map((route) => (
                <MobileFooterItem
                    key={route.label}
                    href={route.href}
                    icon={route.icon}
                    active={route.active}
                    onClick={route.onClick}
                />
            ))}
        </FooterMenu>
    );
};

const FooterMenu = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 40;
    background-color: white;
    border-top: 1px;
    @media (min-width: 1024px) {
        display: none;
    }
`;
