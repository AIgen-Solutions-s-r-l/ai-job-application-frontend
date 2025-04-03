"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Image from "next/image";
import { CloseButtonIcon } from "@/components/AppIcons";
import Template1 from '../svgs/template1.svg';
import Template2 from '../svgs/template2.svg';
import Template3 from '../svgs/template3.svg';
import Template4 from '../svgs/template4.svg';
import ResumeUpload from '../svgs/ResumeUpload.svg';
import { Dispatch, SetStateAction, DragEvent, ChangeEvent } from "react";
import ToggleSwitch from "../common/ToggleSwitch";
import TemplateCard from "./TemplateCard";
import { AiFillFilePdf } from "react-icons/ai";

interface ModalProps {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    onConfirm: () => Promise<void>;
    onCancel?: () => void;
    generateTemplate: boolean;
    setGenerateTemplate: Dispatch<SetStateAction<boolean>>;
    selectedTemplate: number;
    setSelectedTemplate: Dispatch<SetStateAction<number>>;
    cvFile: File | null;
    setCVFile: Dispatch<SetStateAction<File | null>>;
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
    setSelectedTemplate,
    cvFile,
    setCVFile,
}: ModalProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleConfirm = async () => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            await onConfirm();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleCancel = () => {
        if (isSubmitting) return;

        if (onCancel) {
            onCancel();
        }
        setIsModalOpen(false);
    };

    const handleTemplateSelect = (templateNumber: number) => {
        setSelectedTemplate(templateNumber === selectedTemplate ? selectedTemplate : templateNumber);
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file?.type === 'application/pdf') {
            setCVFile(file);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCVFile(file);
        }
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
                            <Dialog.Panel className="flex flex-col items-center relative w-[700px] py-6 bg-white rounded-xl shadow-lg gap-[20px]">
                                <div className="flex w-full justify-end items-center mb-4  px-6">
                                    <button
                                        className="outline-none"
                                        onClick={handleCancel}
                                    >
                                        <CloseButtonIcon />
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
                                {generateTemplate ?
                                    <section className={`px-7 flex w-full py-3 h-[320px] gap-4 bg-base-100 overflow-auto relative`}>
                                        {
                                            [Template1, Template2, Template3, Template4].map((template, index) => (
                                                <TemplateCard
                                                    key={index + 1}
                                                    templateNumber={index + 1}
                                                    templateImage={template}
                                                    isEnabled={generateTemplate}
                                                    isSelected={selectedTemplate === index + 1}
                                                    onSelect={handleTemplateSelect}
                                                />
                                            ))
                                        }
                                    </section>
                                    :
                                    <section className={`px-7 flex items-center justify-center w-full py-3 min-h-[320px] gap-4 bg-purple-100 relative`}>
                                        {!cvFile ? (
                                            <div
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDrop={handleDrop}
                                                className={`flex justify-center items-center w-full h-[320px] ${isDragging ? 'border-dashed border-primary' : 'border-dashed border-gray-300'
                                                    } transition-all duration-200`}
                                            >
                                                <div className="flex flex-col items-center">
                                                    <AiFillFilePdf className={`text-7xl ${isDragging ? 'text-primary' : 'text-neutral'} mb-4`} />
                                                    <p className="text-gray-600 text-base font-medium">Drag & drop your PDF resume here</p>
                                                    <p className="text-sm text-gray-500 mb-4">or</p>
                                                    <label className="btn btn-neutral">
                                                        Browse Files
                                                        <input
                                                            type="file"
                                                            accept=".pdf"
                                                            onChange={handleFileChange}
                                                            className="hidden"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center">
                                                <Image src={ResumeUpload} alt='Resume' />
                                                <p className="font-jura text-lg mt-2 font-bold">{cvFile.name.length > 30 ? cvFile.name.slice(0, 30) + '...' : cvFile.name}</p>
                                                <div
                                                    onClick={() => setCVFile(null)}
                                                    className="cursor-pointer rounded-full px-6 text-lg text-error"
                                                >
                                                    Delete
                                                </div>
                                            </div>
                                        )}
                                    </section>
                                }
                                <div className="flex w-full px-7 justify-end gap-4">
                                    <button
                                        className="btn"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className='btn outline-black bg-primary hover:bg-primary hover:text-white text-black disabled:text-black disabled:cursor-not-allowed' 
                                        onClick={handleConfirm}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Confirm'}
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