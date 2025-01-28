import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ChevronDown, Search } from 'lucide-react';
import { useJobSearch } from '@/contexts/job-search-context';
import { locationQuery } from '@/libs/api/matching';

interface JobSearchBarProps {
  keywords?: string;
  location?: string;
  onSearch: (keywords: string, location: string) => void;
}

export const JobSearchBar: React.FC<JobSearchBarProps> = ({
  keywords,
  location,
  onSearch,
}) => {
  const [dataArray, setDataArray] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const { register, handleSubmit, getValues, setValue } = useForm<{
    keywords?: string;
    location?: string;
  }>({
    defaultValues: {
      keywords,
      location,
    },
  });
  const { jobs } = useJobSearch();

  useEffect(() => {
    setValue('keywords', keywords);
    setValue('location', location);
  }, [keywords, location]);

  const onSubmit = () => {
    const { keywords, location } = getValues();
    onSearch(keywords, location);
  };

  const onLocationChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setShowSuggestions(true);
    if (e.target.value.length > 3) {
      const timeoutId = setTimeout(async () => {
        const response = await locationQuery(e.target.value);
        setDataArray(response);
      }, 200);
      setSearchTimeout(timeoutId);
    } else {
      setDataArray([]);
    }
  }, [searchTimeout]);

  const handleLocationSelect = (data: any) => {
    const locationString = `${data.address.city ? data.address.city : data.address.state}, ${data.address.country}`;
    setValue('location', locationString);
    setShowSuggestions(false);
  };

  return (
    <>
      <div className='w-full bg-base-100'>
        <div className='w-[1440px] mx-auto'>
          <h1 className='text-[32px] leading-10'>Job Search</h1>
        </div>
      </div>

      <div className='w-full bg-base-100 pt-5'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-[1440px] mx-auto flex items-end gap-[30px]'
        >
          <div className='w-[516px] flex-1'>
            <label htmlFor='keywords' className='text-md leading-none'>
              Role
            </label>
            <div className='mt-3 h-14 flex items-center outline outline-2 outline-base-content has-[input:focus-within]:outline-primary rounded-3xl px-5'>
              <input
                type='text'
                id='keywords'
                placeholder='Job title, keywords, or company'
                {...register('keywords')}
                className='block w-full bg-transparent focus:outline focus:outline-0'
              />
            </div>
          </div>
          <div className='relative w-[498px] flex-1'>
            <label htmlFor='location' className='text-md leading-none'>
              Location
            </label>
            <div className='mt-3 h-14 flex-1 flex items-center outline outline-2 outline-base-content has-[input:focus-within]:outline-primary rounded-3xl px-5'>
              <input
                type='text'
                id='location'
                placeholder='City, state, or remote'
                {...register('location', {
                  onChange: onLocationChange
                })}
                className='block w-full bg-transparent focus:outline focus:outline-0'
              />
            </div>
            {dataArray.length > 0 && showSuggestions &&
              <div className='absolute w-full bg-base-100 box-border py-3 outline outline-2 outline-base-content max-h-[200px] mt-2 z-10 flex flex-col gap-1 rounded-3xl overflow-auto'>
                {dataArray.map((data, index) => (
                  <div
                    key={index}
                    onClick={() => handleLocationSelect(data)}
                    className='w-full box-border flex items-center px-10 py-1 hover:text-blue-500 cursor-pointer'
                  >
                    {data.address.city ? data.address.city : data.address.state}, {data.address.country}
                  </div>
                ))}
              </div>
            }
          </div>
          <div className='w-[222px] h-14 flex-0 flex items-center outline outline-2 outline-base-content text-base-content hover:text-white hover:outline-primary hover:bg-primary rounded-3xl'>
            <button
              type='submit'
              className='w-full h-full flex items-center justify-between pl-5'
            >
              <p className='text-md'>Search</p>
              <Search className='mx-4' size={27} />
            </button>
          </div>
        </form>

        <div className='w-[1440px] mx-auto pb-5'>
          <div className='mt-5 flex gap-5'>
            <div className='bg-neutral-content rounded-full flex gap-5 items-center pl-5 pr-3 py-1 cursor-pointer'>
              <p>Full-time</p>
              <ChevronDown size={24} />
            </div>
            <div className='bg-neutral-content rounded-full flex gap-5 items-center pl-5 pr-3 py-1 cursor-pointer'>
              <p>Remote</p>
              <ChevronDown size={24} />
            </div>
            <div className='bg-neutral-content rounded-full flex gap-5 items-center pl-5 pr-3 py-1 cursor-pointer'>
              <p>English</p>
              <ChevronDown size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className='w-full bg-base-100'>
        <div className='w-[1440px] mx-auto pb-5'>
          <p className='text-lg'>
            Your suggested jobs based on your resume:{' '}
            <span className='font-semibold'>{jobs.length} jobs</span> are found.
          </p>
        </div>
      </div>
    </>
  );
};
