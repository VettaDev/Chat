"use client";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import CloseButton from "../Buttons/CloseButton";
import { styled } from "styled-components";
import { IModal } from "@/app/types/modal";

interface ModalProps extends IModal {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    title,
    subtitle,
}) => {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-50 flex h-[100vh] justify-center"
                onClose={onClose}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-out duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="flex justify-center items-center min-h-full text-center p-4 sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel
                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 text-left shadow-xsl transition-all w-full sm:my-8 sm:w-full sm:max-w-lg sm:p-6
                         "
                        >
                            <Body>
                                <CloseButton onClick={onClose} />
                                {title && (
                                    <h1 className="text-xl font-semibold">
                                        {title}
                                    </h1>
                                )}
                                {subtitle && (
                                    <p className="text-sm text-neutral-500 mb-4">
                                        {subtitle}
                                    </p>
                                )}
                                {children}
                            </Body>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Modal;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 300px;
    width: 100%;
`;
