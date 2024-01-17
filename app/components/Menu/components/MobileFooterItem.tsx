"use client";
import Link from "next/link";
import clsx from "clsx";
import { on } from "events";

type MobileFooterItemProps = {
    href: string;
    icon: any;
    active?: boolean;
    onClick?: () => void;
};

const MobileFooterItem = ({
    href,
    icon: Icon,
    active,
    onClick,
}: MobileFooterItemProps) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };

    return (
        <li onClick={handleClick}>
            <Link
                href={href}
                onClick={onClick}
                className={clsx(
                    `
                group
                flex
                justify-center
                gap-x-3
                p-4
                text-sm
                leading-6
                font-semibold
                text-gray-500
                hover:text-gray-900
                hover:bg-gray-100
                w-full
                `,
                    active && "bg-gray-100 text-gray-900",
                )}
            >
                <Icon className={`w-5 h-5 shrink-0`} />
            </Link>
        </li>
    );
};
export default MobileFooterItem;
