"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useState } from "react";
import React from "react";
import { locationQuery } from "@/libs/api/matching";
import { useForm } from "react-hook-form";
import { ArrowRightIcon } from "../AppIcons";
import { useRouter } from "next/navigation";

interface MyLocation {
  city?: string
  country?: string
  latitude?: number
  longitude?: number
  location?: string
}

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

    const { register, handleSubmit, getValues, reset } = useForm<MyLocation>({
        defaultValues: {
            location: defaultLocation,
        }
    });

    const onLocationChange = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
          if (searchTimeout) {
            clearTimeout(searchTimeout);
          }
    
          setShowSuggestions(true);
          if (e.target.value.length > 3) {
            const timeoutId = setTimeout(async () => {
              const response = await locationQuery(e.target.value);
    
              setDataArray(response);
              console.log("response is: ", response);
            }, 200);
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

        reset({
            city,
            country,
            latitude,
            longitude,
            location: display_name,
        });

        setShowSuggestions(false);
    };

    const onSubmit = () => {
        const { country, city, location } = getValues()
        router.push(`/search?country=${country ?? defaultLocation}${city ? `&city=${city}` : ''}&location=${location ?? defaultLocation}`)
    };

    return (
        <Transition appear show={isModalOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-50"
                onClose={() => {}}
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
                                    Where do you want to apply for a job? <br />
                                    *You can select a city or a country
                                </p>
                                
                                <form
                                    id='location-choose'
                                    onSubmit={handleSubmit(onSubmit)}
                                    className='w-full h-[350px] bg-my-neutral-1 p-[30px]'
                                >
                                        <label htmlFor='location' className='text-base font-semibold leading-[20px]'>
                                            Location
                                        </label>
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
                                </form>

                                <button
                                    className="my-btn-green gap-[60px] font-semibold text-[18px]"
                                    form='location-choose'
                                    type='submit'
                                >
                                    <p>Confirm</p>
                                    <ArrowRightIcon classname='fill-black' />
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