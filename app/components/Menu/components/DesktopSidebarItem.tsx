"use client";
import Link from "next/link";
import clsx from "clsx";

type DesktopSidebarItemProps = {
    href: string;
    label: string;
    icon: any;
    active?: boolean;
    onClick?: () => void;
};

const DesktopSidebarItem = ({
    href,
    label,
    icon: Icon,
    active,
    onClick,
}: DesktopSidebarItemProps) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };

    return (
        <li onClick={handleClick}>
            <Link
                href={href}
                className={clsx(
                    `
                group
                flex
                gap-x-3
                rounded-md
                p-3
                text-sm
                leading-6
                font-semibold
                text-gray-500
                hover:text-gray-900
                hover:bg-gray-100
                `,
                    active && "bg-gray-100 text-gray-900",
                )}
            >
                <Icon className={`w-5 h-5 shrink-0`} />
                <span className="sr-only">{label}</span>
            </Link>
        </li>
    );
};
export default DesktopSidebarItem;
