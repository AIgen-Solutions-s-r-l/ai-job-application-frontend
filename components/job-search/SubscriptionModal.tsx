"use client";

import { Fragment, Dispatch, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CloseButtonIcon } from "@/components/AppIcons";
import SubscriptionTab from "@/components/subscription/subscriptionTab";

interface ModalProps {
    isModalOpen: boolean;
    onCancel?: () => void;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const SubscriptionModal = ({
    isModalOpen,
    onCancel,
    setIsModalOpen,
}: ModalProps) => {
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
                            <div className="flex w-full justify-between items-center mb-4 px-6">
                              <div className="w-[30px] h-[20px]"></div>
                              <p className="font-jura text-[18px] font-semibold">You don&apos;t have enough credits</p>
                              <button
                                className="outline-none"
                                onClick={handleCancel}
                              >
                                <CloseButtonIcon />
                              </button>
                            </div>
                            <SubscriptionTab />
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
  );
};

export default SubscriptionModal;