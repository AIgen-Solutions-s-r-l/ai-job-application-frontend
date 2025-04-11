"use client";

import { Fragment, Dispatch, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CloseButtonIcon } from "@/components/AppIcons";
import { Trash2, Building2, Briefcase, Trash, Delete, DeleteIcon } from "lucide-react";
import { useJobSearch } from "@/contexts/job-search-context";

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const SelectedJobsModal = ({ isModalOpen, setIsModalOpen }: ModalProps) => {
  const { selectedJobs, handleJobSelect } = useJobSearch();

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsModalOpen(false)}
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
              <Dialog.Panel className="flex flex-col items-center relative w-[700px] max-h-[80vh] py-6 bg-white rounded-xl shadow-lg">
                <div className="flex w-full justify-between items-center mb-4 px-6">
                  <div className="w-[30px] h-[20px]"></div>
                  <p className="font-jura text-[18px] font-semibold">{selectedJobs.length.toLocaleString('en-US')} Jobs Selected</p>
                  <button
                    className="outline-none"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <CloseButtonIcon />
                  </button>
                </div>

                <div className="w-full px-6 my-scrollable">
                  <div className="divide-y divide-gray-200">
                    {selectedJobs.map((job) => (
                      <div
                        key={job.id}
                        className="flex items-center justify-between py-4 hover:bg-gray-50"
                      >
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Briefcase className="h-4 w-4 text-gray-400" />
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {job.title}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-gray-400" />
                            <p className="text-sm text-gray-500 truncate">
                              {job.company_name}
                            </p>
                          </div>
                        </div>
                        <div 
                          className="h-12 w-12 flex items-center justify-end cursor-pointer"
                          onClick={(e) => handleJobSelect(job, e as any)}
                        >
                          <Trash2 className="text-primary-light-purple" size={24} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {selectedJobs.length > 0 && (
                  <div className="flex items-center justify-center w-full mt-4">
                  <div 
                    className="flex items-center gap-2 text-red-500 cursor-pointer absolute bottom-4 pt-4"
                    onClick={(e) => {
                    e.stopPropagation();
                    // Clear all selected jobs
                    selectedJobs.forEach(job => handleJobSelect(job, e as any));
                    }}
                  >
                    <Trash2 size={20} />
                    <span className="text-sm font-medium">Clear all</span>
                  </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SelectedJobsModal;