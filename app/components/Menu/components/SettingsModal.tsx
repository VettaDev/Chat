"use client";
import { Button } from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import useConversation from "@/app/hooks/useConversation";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Input } from "../../Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { HiPhoto } from "react-icons/hi2";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentUser: User;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    currentUser,
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image,
        },
    });
    const image = watch("image");
    const handleUpload = (result: any) => {
        setValue("image", result?.info?.secure_url, { shouldValidate: true });
    };

    const handleSubmitUser: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios
            .post(`/api/settings`, data)
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => {
                toast.error("Failed to update user");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form
                className="flex flex-col gap-4 w-[300px]"
                onSubmit={handleSubmit(handleSubmitUser)}
            >
                <h2 className="text-xl font-semibold">Profile</h2>
                <p className="text-sm text-neutral-500">
                    Update your profile information
                </p>
                <div className="flex flex-col gap-y-8 mt-8">
                    <Input
                        disabled={isLoading}
                        label="Name"
                        id="name"
                        register={register}
                        errors={errors}
                        required
                    />
                    <div>
                        <label
                            htmlFor="image"
                            className="block text-sm font-medium text-gray-900 leading-6"
                        >
                            Photo
                        </label>
                        <div className="mt-2 flex items-center gap-x-3">
                            <Image
                                src={
                                    image ||
                                    currentUser?.image ||
                                    "/images/placeholder.jpg"
                                }
                                alt="User avatar"
                                width={48}
                                height={48}
                                className="rounded-full"
                            />

                            <CldUploadButton
                                options={{ maxFiles: 1 }}
                                onUpload={handleUpload}
                                uploadPreset="naebskgj"
                            >
                                <Button
                                    disabled={isLoading}
                                    type="button"
                                    secondary
                                >
                                    Change
                                </Button>
                            </CldUploadButton>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 justify-end">
                    <Button onClick={onClose} disabled={isLoading} secondary>
                        Cancel
                    </Button>
                    <Button disabled={isLoading} type="submit">
                        Save
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default SettingsModal;
