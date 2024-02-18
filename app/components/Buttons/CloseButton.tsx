"use client";

import { ButtonProps } from "./types";
import { IoClose } from "react-icons/io5";

const CloseButton = ({ onClick }: Pick<ButtonProps, "onClick">) => {
    return (
        <button
            type="button"
            className="rounded-md bg-white border-none text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 absolute top-4 right-4"
            onClick={onClick}
        >
            <span className="sr-only">Close panel</span>
            <IoClose size="24" />
        </button>
    );
};

export default CloseButton;
