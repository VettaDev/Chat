"use client";
import { Button } from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
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
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col gap-4 w-[300px]">
                <h1 className="text-xl font-semibold">Are you sure?</h1>
                <div className="flex gap-4 justify-end">
                    <Button onClick={onClose} disabled={isLoading} secondary>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConversation}
                        danger
                        disabled={isLoading}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
