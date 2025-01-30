"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import CloseButton from "../svgs/CloseBtn.svg";
import Template1 from '../svgs/template1.svg';
import Template2 from '../svgs/template2.svg';
import Template3 from '../svgs/template3.svg';
import Template4 from '../svgs/template4.svg';
import React from "react";
import ToggleSwitch from "../common/ToggleSwitch";
import TemplateCard from "./TemplateCard";

interface ModalProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onConfirm: () => void;
    onCancel?: () => void;
    generateTemplate: boolean;
    setGenerateTemplate: React.Dispatch<React.SetStateAction<boolean>>;
    selectedTemplate: number;
    setSelectedTemplate: React.Dispatch<React.SetStateAction<number>>;

}

// A reusable confirmation modal with a message and two buttons: Cancel and Confirm
const GenerateResumeModal = ({
    isModalOpen,
    setIsModalOpen,
    onConfirm,
    onCancel,
    generateTemplate,
    setGenerateTemplate,
    selectedTemplate = 1,
    setSelectedTemplate
}: ModalProps) => {
    // Default onCancel action if not provided
    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
        setIsModalOpen(false);
    };

    const handleTemplateSelect = (templateNumber: number) => {
        setSelectedTemplate(templateNumber === selectedTemplate ? selectedTemplate : templateNumber);
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
                    <div className="fixed inset-0 bg-neutral-focus bg-opacity-50 bg-gray-600" />
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
                            <Dialog.Panel className="flex flex-col items-center relative w-[700px] py-6 bg-base-100 rounded-xl shadow-lg gap-[20px]">
                                <div className="flex w-full justify-end items-center mb-4  px-6">
                                    <button
                                        className="outline-none"
                                        onClick={handleCancel}
                                    >
                                        <Image src={CloseButton} alt='close button' />
                                    </button>
                                </div>
                                <section className="pb-5 px-6">
                                    <p className="font-jura text-[18px] font-semibold">
                                        Generate a resume for each job post with the selected template?
                                    </p>
                                </section>
                                <ToggleSwitch
                                    value={generateTemplate}
                                    onChange={setGenerateTemplate}
                                    label="Yes, Generate"
                                />
                                <section className={`px-7 flex w-full py-3 h-[320px] gap-4 bg-purple-100 ${generateTemplate ? 'overflow-auto' : 'overflow-hidden'} relative ${!generateTemplate && 'opacity-50'}`}>
                                    {[Template1, Template2, Template3, Template4].map((template, index) => (
                                        <TemplateCard
                                            key={index + 1}
                                            templateNumber={index + 1}
                                            templateImage={template}
                                            isEnabled={generateTemplate}
                                            isSelected={selectedTemplate === index + 1}
                                            onSelect={handleTemplateSelect}
                                        />
                                    ))}
                                </section>
                                <div className="flex w-full px-7 justify-end gap-4">
                                    <button
                                        className="btn btn-outline"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn outline outline-1 outline-black bg-purple-200 hover:bg-purple-300"
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