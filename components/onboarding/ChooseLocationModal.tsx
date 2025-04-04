"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useState } from "react";
import React from "react";
import { locationQuery } from "@/libs/api/matching";
import { useForm } from "react-hook-form";
import { ArrowRightIcon } from "../AppIcons";
import { useRouter } from "next/navigation";
import { setServerCookie } from '@/libs/cookies';
import { useUserContext } from '@/contexts/user-context';
import { FaSpinner } from "react-icons/fa";
import { AlertTriangle } from "lucide-react";

interface MyLocation {
    city?: string
    country?: string
    latitude?: number
    longitude?: number
    location?: string
}

interface Experience {
    experience: "Intern" | "Entry-level" | "Mid-level" | "Senior-level" | "Executive-level"
}

type FormType = MyLocation & Experience;

interface ModalProps {
    isModalOpen: boolean;
    defaultLocation: string;
}

const ChoseLocationModal = ({
    isModalOpen,
    defaultLocation,
}: ModalProps) => {
    const router = useRouter()
    const [dataArray, setDataArray] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    // eslint-disable-next-line no-undef
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
    const { setUser } = useUserContext();
    const [isLoading, setIsLoading] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);

    const { register, handleSubmit, getValues, reset } = useForm<FormType>({
        defaultValues: {
            location: defaultLocation,
            experience: "Mid-level",  
        }
    });

    const onLocationChange = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }

            setShowSuggestions(true);
            setLocationError(null);
            
            if (e.target.value.length > 2) {
                const timeoutId = setTimeout(async () => {
                    const response = await locationQuery(e.target.value);
                    setDataArray(response);
                }, 100);
                setSearchTimeout(timeoutId);
            } else {
                setDataArray([]);
            }
        },
        [searchTimeout]
    );

    const handleLocationSelect = (data: any) => {
        // get only params needs for JobSearchParams
        const { city, country } = data.address;
        const { display_name, lat: latitude, lon: longitude } = data;

        const county = data.address.city
            ? `${data.address.city}, `
            : data.address.village
                ? `${data.address.village}, `
                : data.address.town
                ? `${data.address.town}, `
                : '';

        reset({
            city,
            country,
            latitude,
            longitude,
            location: `${county}${country}`
        });

        setShowSuggestions(false);
        setLocationError(null);
    };

    const onSubmit = async () => {
        const { location, country, experience } = getValues()
        if (location && !country) {
            setLocationError('Please select a location from the dropdown');
            return;
        }
        setIsLoading(true);
        setUser((prev) => ({...prev, exists: true }));
        await setServerCookie('lastJobSearchData', JSON.stringify({ country, experience }), {});
        router.push('/search')
    };

    return (
        <Transition appear show={isModalOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-50"
                onClose={() => { }}
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
                            <Dialog.Panel className="flex flex-col items-center relative w-[700px] px-6 py-[50px] bg-white rounded-xl shadow-lg gap-[30px] font-jura">
                                <p className="text-[18px] font-semibold text-center leading-[20px]">
                                    Where do you want to apply for a job <br />
                                    and what is your seniority level?
                                </p>

                                <form
                                    id='location-choose'
                                    onSubmit={handleSubmit(onSubmit)}
                                    className='w-full h-[350px] bg-my-neutral-1 p-[30px]'
                                >
                                    <div>
                                        <label htmlFor='experience' className='text-base font-semibold leading-[20px] mt-6'>
                                            Experience level
                                        </label>
                                        <div className="w-full">
                                            <select
                                                id='experience'
                                                {...register('experience')}
                                                className='w-full mt-3 h-10 bg-white outline-none border-[1px] border-my-neutral-4 focus:border-primary-light-purple px-[10px] rounded-md text-base form-select'
                                            >
                                                <option value="Entry-level">Entry-level</option>
                                                <option value="Mid-level">Mid-level</option>
                                                <option value="Senior-level">Senior-level</option>
                                                <option value="Executive-level">Executive-level</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <div className="flex gap-2">
                                            <label htmlFor='location' className='hidden md:block text-base leading-none'>
                                            Location
                                            </label>
                                            {locationError && (
                                            <div className='text-red-500 text-sm flex items-center'>
                                                <AlertTriangle size={16} className='mr-2' />
                                                {locationError}
                                            </div>
                                            )}
                                        </div>
                                        <div className='w-full mt-3 h-12 bg-white flex items-center border border-1 border-neutral has-[input:focus-within]:border-primary rounded-md px-5'>
                                            <input
                                                type='text'
                                                id='location'
                                                placeholder='City, state, or remote'
                                                {...register('location', {
                                                    onChange: onLocationChange,
                                                })}
                                                autoComplete="off"
                                                className='block w-full bg-transparent focus:outline focus:outline-0 text-base font-semibold leading-[20px]'
                                            />
                                        </div>
                                        {dataArray.length > 0 && showSuggestions && (
                                            <div className='w-full box-border bg-white py-3 border border-1 border-neutral max-h-[200px] mt-2 flex flex-col gap-1 rounded-md overflow-auto px-5'>
                                                {dataArray.map((data, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => handleLocationSelect(data)}
                                                        className='w-full box-border flex items-center py-1 hover:text-blue-500 cursor-pointer text-[16px] font-semibold leading-[20px]'
                                                    >
                                                        {data.display_name}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </form>

                                <button
                                    className="my-btn-green gap-[60px] font-semibold text-[18px] disabled:bg-my-neutral-2 disabled:cursor-not-allowed"
                                    form='location-choose'
                                    type='submit'
                                    disabled={isLoading}
                                >
                                    {isLoading 
                                    ? (
                                        <>
                                            <p>Sumbitting</p>
                                            <FaSpinner className="animate-spin" />
                                        </>
                                    ) : (
                                        <>
                                            <p>Confirm</p>
                                            <ArrowRightIcon />
                                        </>
                                    )}
                                </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ChoseLocationModal;