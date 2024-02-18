"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/Buttons/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Input } from "../../Input";
import { CldUploadButton } from "next-cloudinary";
import Modal from "@/app/components/Modals/Modal";
import Image from "next/image";
import ModalActionButtons from "../../Buttons/ModalActionButtons";
import { User } from "@prisma/client";
import axios from "axios";
import { IModal } from "@/app/types/modal";

interface ISettingsModal extends IModal {
    currentUser: User;
}

const SettingsModal: React.FC<ISettingsModal> = ({
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
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Profile"
            subtitle=" Update your profile information"
        >
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(handleSubmitUser)}
            >
                <Input
                    disabled={isLoading}
                    label="Name"
                    id="name"
                    register={register}
                    errors={errors}
                    required
                />

                <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-900 leading-6"
                >
                    Photo
                </label>

                <Image
                    src={
                        image || currentUser?.image || "/images/placeholder.jpg"
                    }
                    alt="User avatar"
                    width="48"
                    height="48"
                    className="rounded-full h-[48px]"
                />
                <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="naebskgj"
                >
                    <Button disabled={isLoading} type="button" secondary>
                        Change
                    </Button>
                </CldUploadButton>

                <ModalActionButtons
                    onCancel={onClose}
                    disabled={isLoading}
                    mainButtonText="Save"
                    type="submit"
                />
            </form>
        </Modal>
    );
};

export default SettingsModal;
