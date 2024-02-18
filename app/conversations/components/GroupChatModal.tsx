"use client";

import ModalActionButtons from "@/app/components/Buttons/ModalActionButtons";
import { Input } from "@/app/components/Input";
import Modal from "@/app/components/Modals/Modal";
import Select from "@/app/components/Select";
import { IModal } from "@/app/types/modal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface ModalProps extends IModal {
    users?: User[];
}

const GroupChatModal: React.FC<ModalProps> = ({ isOpen, onClose, users }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        handleSubmit,
        register,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            members: [],
        },
    });
    const members = watch("members");

    const handleSubmitGroupChat: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios
            .post(`/api/conversations`, { ...data, isGroup: true })
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => {
                toast.error("Failed to create group chat");
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title=" Create Group Chat Test"
            subtitle="Create a chat with group more then 2 people"
        >
            <form onSubmit={handleSubmit(handleSubmitGroupChat)}>
                <Input
                    label="name"
                    register={register}
                    id="name"
                    required
                    disabled={isLoading}
                    errors={errors}
                />
                {users && (
                    <Select
                        label="Members"
                        register={register}
                        id="members"
                        options={users.map((user) => ({
                            label: user.name!,
                            value: user.id,
                        }))}
                        value={members}
                        onChange={(value: { label: string; value: string }) => {
                            setValue("members", value, {
                                shouldValidate: true,
                            });
                        }}
                        isMulti
                        disabled={isLoading}
                        errors={errors}
                    />
                )}
                <ModalActionButtons mainButtonText="Save" onCancel={onClose} />
            </form>
        </Modal>
    );
};

export default GroupChatModal;
