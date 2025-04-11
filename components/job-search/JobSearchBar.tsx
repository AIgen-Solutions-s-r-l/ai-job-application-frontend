import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AlertTriangle, Building2, Globe2, HomeIcon, Search } from 'lucide-react';
import { locationQuery } from '@/libs/api/matching';
import { JobSearchProps } from '@/libs/definitions';
import { useRouter } from 'next/navigation';
import { Container } from '../Container';
import { setServerCookie } from '@/libs/cookies';
import { useJobSearch } from '@/contexts/job-search-context';

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
  const [locationError, setLocationError] = useState<string | null>(null);
  const { totalCount } = useJobSearch();

  const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm<JobSearchProps>({
    defaultValues: { ...searchParams, is_remote_only: String(searchParams.is_remote_only) === 'true' }, // Handle potential string from URL params
  });

  const router = useRouter();

  const onSearch = (searchProps: JobSearchProps) => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(searchProps)) {
      params.set(key, value);
    }

    router.push(`?${params.toString()}`);
  };

  const onSubmit = async () => {
    const { q, location, country, city, latitude, longitude, experience, is_remote_only } = getValues(); // Get is_remote_only value

    // Validate location if there's any input
    if (location && !country) {
      setLocationError('Please select a location from the dropdown');
      return;
    }

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

    if (experience) {
      cleanParams.experience = experience;
    }

    // Add is_remote_only only if it's true
    if (is_remote_only) {
      cleanParams.is_remote_only = true;
    }

    await setServerCookie('lastJobSearchData', JSON.stringify({ country, experience: experience ?? '' }), {});

    onSearch(cleanParams);
  };

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
        }, 200);
        setSearchTimeout(timeoutId);
      } else {
        setDataArray([]);
      }

      // Clear all location-related data when input is empty or too short
      if (!e.target.value || e.target.value.length <= 2) {
        reset({
          ...getValues(),
          location: e.target.value,
          city: undefined,
          country: undefined,
          latitude: undefined,
          longitude: undefined,
        });
      }
    },
    [getValues, reset, searchTimeout]
  );

  const handleLocationSelect = (data: any) => {
    // get only params needs for JobSearchParams
    const { country } = data.address;
    const { lat: latitude, lon: longitude } = data;
    // eslint-disable-next-line no-unused-vars
    const { location, ...searchParams } = getValues();

    const county = data.address.city
      ? `${data.address.city}, `
      : data.address.village
        ? `${data.address.village}, `
        : data.address.town
          ? `${data.address.town}, `
          : '';

    reset({
      ...searchParams,
      city: county,
      country,
      latitude,
      longitude,
      location: `${county}${country}`
      ,
    });

    setShowSuggestions(false);
    setLocationError(null);
  };

  const getIcon = (addresstype: any) => {
    switch (addresstype) {
      case 'country':
        return <Globe2 size={16} className="text-neutral-400" />;
      case 'city':
      case 'town':
        return <Building2 size={16} className="text-neutral-400" />;
      default:
        return <HomeIcon size={16} className="text-neutral-400" />;
    }
  };

  return (
    <Container>
      <div className='hidden lg:block w-full'>
        <h1 className='font-montserrat text-[28px] leading-[1.1] font-semibold'>Search Jobs</h1>
      </div>

      <div className='w-full md:pt-5'>
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col md:flex-row md:items-end md:gap-4 xl:gap-6 font-jura font-semibold">
            <div className='flex-1'>
              <label htmlFor='q' className='hidden md:block text-base leading-none'>
                Role
              </label>
              <div className='mt-3 h-12 flex bg-white items-center border border-1 border-neutral has-[input:focus-within]:border-primary rounded-md px-5'>
                <input
                  type='text'
                  id='q'
                  placeholder='Job title, keyword, or company'
                  {...register('q')}
                  autoComplete='off'
                  className='block w-full bg-transparent focus:outline focus:outline-0'
                />
              </div>
            </div>
            <div className='relative flex-1'>
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
              <div className='mt-3 h-12 flex-1 bg-white flex items-center border border-1 border-neutral has-[input:focus-within]:border-primary rounded-md px-5'>
                <input
                  type='text'
                  id='location'
                  placeholder='City or Country'
                  {...register('location', {
                    onChange: onLocationChange,
                  })}
                  autoComplete='off'
                  className='block w-full bg-transparent focus:outline focus:outline-0'
                />
              </div>

              {dataArray.length > 0 && showSuggestions && (
                <div className='absolute w-full bg-white box-border py-3 border border-1 border-neutral max-h-[200px] mt-2 z-30 flex flex-col gap-1 rounded-md overflow-auto'>
                  {dataArray.map((data, index) => (
                    <div
                      key={index}
                      onClick={() => handleLocationSelect(data)}
                      className='w-full box-border flex items-center px-5 py-1 hover:text-blue-500 cursor-pointer'
                    >
                      {(() => {
                        const location = data.address.city
                          ? `${data.address.city}, `
                          : data.address.village
                            ? `${data.address.village}, `
                            : data.address.town
                              ? `${data.address.town}, `
                              : '';
                        return (
                          <>
                            <div className="flex items-center gap-2">
                              {getIcon(data.addresstype)}
                              <span className="text-neutral-500 text-sm">
                                {`${location}${data.address.country}`}
                              </span>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className='md:w-[162px] lg:w-[222px] mt-3 md:mt-0 bg-white h-14 flex-0 flex items-center border border-1 border-neutral-cold text-base-content hover:text-white hover:border-primary hover:bg-primary rounded-3xl'>
              <button
                type='submit'
                className='w-full h-full flex items-center justify-between pl-5'
              >
                <p className='text-[18px]'>Search</p>
                <Search className='mx-4' size={27} />
              </button>
            </div>
          </div>

          <div className='flex items-center mt-3 md:pb-1 md:mt-5 gap-16'>
            <p className='hidden md:block text-[20px] font-jura font-medium'>
              <span className='font-bold'>{totalCount.toLocaleString('en-US')} jobs</span> found
            </p>
            <div className='flex flex-wrap gap-2 lg:gap-8 text-base font-jura font-semibold'>
              <select
                {...register('experience', { required: 'Select experience level' })}
                className='select bg-white border-2 border-neutral hover:border-primary
                    transition-colors duration-200 focus:outline-none w-[200px] 
                    h-10 min-h-10 rounded-full px-4 cursor-pointer
                    text-neutral-700 font-medium appearance-none relative
                    shadow-sm hover:shadow-md'
              >
                <option value="" disabled>Experience level</option>
                <option value="Entry-level">Entry-level</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior-level">Senior-level</option>
                <option value="Executive-level">Executive-level</option>
              </select>
              {!!errors.experience && <p className="text-error mt-[2px] text-xs lg:text-sm font-jura">{errors.experience?.message}</p>}

              {/* Remote Only Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_remote_only"
                  {...register('is_remote_only')}
                  className="checkbox checkbox-primary checkbox-sm border-neutral hover:border-primary"
                />
                <label htmlFor="is_remote_only" className="cursor-pointer select-none">
                  Remote Only
                </label>
              </div>
              {/* <select
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
              </select> */}
            </div>
          </div>
        </form>

      </div>
    </Container>
  );
};
