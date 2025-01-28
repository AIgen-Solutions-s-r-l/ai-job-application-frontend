"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import React from "react";

interface ModalProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title?: string;
    onConfirm: () => void;
    onCancel?: () => void;
}

// A reusable confirmation modal with a message and two buttons: Cancel and Confirm
const GenerateResumeModal = ({
    isModalOpen,
    setIsModalOpen,
    title = "Confirm Action",
    onConfirm,
    onCancel,
}: ModalProps) => {
    // Default onCancel action if not provided
    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
        setIsModalOpen(false);
    };

    return (
        <Transition appear show={isModalOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-50"
                onClose={handleCancel}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-neutral-focus bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="relative w-full max-w-md p-6 bg-base-100 rounded-xl shadow-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-semibold"
                                    >
                                        {title}
                                    </Dialog.Title>
                                </div>

                                <section className="pb-5">HereHehe</section>

                                <div className="flex justify-end gap-4">
                                    <button
                                        className="btn btn-outline"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            onConfirm();
                                            setIsModalOpen(false);
                                        }}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default GenerateResumeModal;