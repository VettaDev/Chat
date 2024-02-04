"use client";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
    id: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    placeholder?: string;
    type?: string;
    required?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
    id,
    register,
    errors,
    placeholder,
    type,
    required,
}) => {
    return (
        <div className="relative w-full">
            <input
                id={id}
                type={type}
                autoComplete={id}
                placeholder={placeholder}
                {...register(id, { required })}
                className=" text-black font-light py-2 px-4 bg-neutral-100 w-full focus:outline-none rounded-full"
            />
        </div>
    );
};

export default MessageInput;
