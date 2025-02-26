import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Search } from 'lucide-react';
import { useJobSearch } from '@/contexts/job-search-context';
import { locationQuery } from '@/libs/api/matching';
import { JobSearchProps } from '@/libs/definitions';
import { useRouter } from 'next/navigation';

interface JobSearchBarProps {
  searchParams: JobSearchProps;
  // eslint-disable-next-line no-unused-vars
}

export const JobSearchBar: React.FC<JobSearchBarProps> = ({
  searchParams,
}) => {
  const [dataArray, setDataArray] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // eslint-disable-next-line no-undef
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const { register, handleSubmit, getValues, reset } = useForm<JobSearchProps>({
    defaultValues: searchParams,
  });
  const { jobs } = useJobSearch();

  const router = useRouter();
  
  const onSearch = (searchProps: JobSearchProps) => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(searchProps)) {
      params.set(key, value);
    }

    router.push(`?${params.toString()}`);
  };

  const onSubmit = () => {
    const { q, location, country, city, latitude, longitude } = getValues();
  
    const cleanParams: JobSearchProps = {
      q,
      location
    };
    
    if (country) {
      cleanParams.country = country;
    }
    
    if (city && city !== 'undefined') {
      cleanParams.city = city;
      
      if (latitude && longitude) {
        cleanParams.latitude = latitude;
        cleanParams.longitude = longitude;
      }
    }
    
    onSearch(cleanParams);
  };

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
        }, 200);
        setSearchTimeout(timeoutId);
      } else {
        setDataArray([]);
      }

      // clear address
      if (!e.target.value) {
        reset({
          q: getValues().q,
        });
      }
    },
    [getValues, reset, searchTimeout]
  );

  const handleLocationSelect = (data: any) => {
    // get only params needs for JobSearchParams
    const { city, country } = data.address;
    const { display_name, lat: latitude, lon: longitude } = data;
    // eslint-disable-next-line no-unused-vars
    const { location, ...searchParams } = getValues();

    reset({
      ...searchParams,
      city,
      country,
      latitude,
      longitude,
      location: display_name,
    });

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
            <label htmlFor='q' className='text-md leading-none'>
              Role
            </label>
            <div className='mt-3 h-12 flex bg-white items-center border border-1 border-neutral has-[input:focus-within]:border-primary rounded-md px-5'>
              <input
                type='text'
                id='q'
                placeholder='Job title, keywords, or company'
                {...register('q')}
                autoComplete='off'
                className='block w-full bg-transparent focus:outline focus:outline-0'
              />
            </div>
          </div>
          <div className='relative w-[498px] flex-1'>
            <label htmlFor='location' className='text-md leading-none'>
              Location
            </label>
            <div className='mt-3 h-12 flex-1 bg-white flex items-center border border-1 border-neutral has-[input:focus-within]:border-primary rounded-md px-5'>
              <input
                type='text'
                id='location'
                placeholder='City, state, or remote'
                {...register('location', {
                  onChange: onLocationChange,
                })}
                autoComplete='off'
                className='block w-full bg-transparent focus:outline focus:outline-0'
              />
            </div>
            {dataArray.length > 0 && showSuggestions && (
              <div className='absolute w-full bg-white box-border py-3 border border-1 border-neutral max-h-[200px] mt-2 z-10 flex flex-col gap-1 rounded-md overflow-auto'>
                {dataArray.map((data, index) => (
                  <div
                    key={index}
                    onClick={() => handleLocationSelect(data)}
                    className='w-full box-border flex items-center px-10 py-1 hover:text-blue-500 cursor-pointer'
                  >
                    {data.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='w-[222px] bg-white h-14 flex-0 flex items-center border border-1 border-neutral-cold text-base-content hover:text-white hover:border-primary hover:bg-primary rounded-3xl'>
            <button
              type='submit'
              className='w-full h-full flex items-center justify-between pl-5'
            >
              <p className='text-md'>Search</p>
              <Search className='mx-4' size={27} />
            </button>
          </div>
        </form>

        <div className='flex items-center w-[1440px] mx-auto pb-5 mt-5 gap-16'>
          <p className='text-lg'>
            <span className='font-semibold'>{jobs.length} jobs</span> found.
          </p>
          <div className='flex gap-8 text-base'>
            <select
              className='select bg-neutral-content focus:outline-none w-[150px] h-8 min-h-8 rounded-full flex gap-5 items-center'
              defaultValue='fullTime'
            >
              <option disabled value='fullTime'>
                Full-time
              </option>
              <option value='partTime'>Part-time</option>
              <option value='internship'>Internship</option>
            </select>
            <select
              className='select bg-neutral-content focus:outline-none w-[150px] h-8 min-h-8 rounded-full flex gap-5 items-center'
              defaultValue='remote'
            >
              <option disabled value='remote'>
                Remote
              </option>
              <option value='onSite'>On-site</option>
            </select>
            <select
              className='select bg-neutral-content focus:outline-none w-[150px] h-8 min-h-8 rounded-full flex gap-5 items-center'
              defaultValue='english'
            >
              <option disabled value='english'>
                English
              </option>
              <option value='russian'>Russian</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};
