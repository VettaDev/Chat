"use client";
import Modal from "@/app/components/Modals/Modal";
import Image from "next/image";
import React from "react";
interface PreviewImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    src: string;
}

const PreviewImageModal: React.FC<PreviewImageModalProps> = ({
    isOpen,
    onClose,
    src,
}) => {
    if (!src) return null;
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-80 h-80">
                <Image alt={"Image"} src={src} className="object-cover" fill />
            </div>
        </Modal>
    );
};

export default PreviewImageModal;
