"use client";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
    const { conversationId } = useConversation();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            message: "",
        },
    });
    const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
        setValue("message", "", { shouldValidate: true });
        axios.post(`/api/messages`, {
            ...data,
            conversationId,
        });
    };
    const handleUpload = (data: any) => {
        axios.post(`/api/messages`, {
            image: data?.info?.secure_url,
            conversationId,
        });
    };
    return (
        <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset="naebskgj"
            >
                <HiPhoto size={30} className="text-sky-500" />
            </CldUploadButton>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center lg:gap-4 w-full"
            >
                <MessageInput
                    id="message"
                    placeholder="Type a message"
                    register={register}
                    errors={errors}
                    required
                />
                <button
                    type="submit"
                    className="bg-sky-500 hover:bg-sky-600 px-1 py-1 transition cursor-pointer rounded-full transitions"
                >
                    <HiPaperAirplane size={18} className="text-white" />
                </button>
            </form>
        </div>
    );
};

export default Form;
