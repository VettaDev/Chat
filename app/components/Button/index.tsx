"use client";

import { FC } from "react";
import { ButtonProps } from "./types";
import clsx from "clsx";

export const Button: FC<ButtonProps> = ({
    type,
    onClick,
    disabled,
    secondary,
    fulllWidth,
    children,
    danger,
}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={clsx(
                `
            flex
            justify-center
            rounded-md
            px-3
            py-2
            text-sm
            font-semibold
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            `,
                disabled && "opacity-50 cursor-default",
                fulllWidth && "w-full",
                secondary ? "text-gray-900" : "text-white",
                danger &&
                    "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
                !secondary &&
                    "bg-sky-600 hover:bg-sky-600 focus-visible:outline-sky-600",
            )}
        >
            {children}
        </button>
    );
};
