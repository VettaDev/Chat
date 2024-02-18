"use client";

import Modal from "@/app/components/Modals/Modal";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import ModalActionButtons from "../Buttons/ModalActionButtons";
import { IModal } from "@/app/types/modal";

const ConfirmModal: React.FC<IModal> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const { conversationId } = useConversation();
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteConversation = useCallback(() => {
        setIsLoading(true);
        axios
            .delete(`/api/conversations/${conversationId}`)
            .then(() => {
                router.push("/conversations");
                onClose();
            })
            .catch(() => {
                toast.error("Failed to delete conversation");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [conversationId, onClose, router]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Are you sure?"
            subtitle="This conversation will be deleted"
        >
            <ModalActionButtons
                onCancel={onClose}
                disabled={isLoading}
                mainButtonText="Delete"
                danger
                onClick={handleDeleteConversation}
            />
        </Modal>
    );
};

export default ConfirmModal;
