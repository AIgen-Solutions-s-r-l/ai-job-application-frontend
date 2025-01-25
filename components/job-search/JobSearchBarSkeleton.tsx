import { ChevronDown, Search } from 'lucide-react';
import { FC } from 'react';

interface Props {
  keywords?: string;
  location?: string;
}

export const JobSearchBarSkeleton: FC<Props> = ({keywords, location}) => {
  return (
    <>
      <div className='w-full bg-base-100'>
        <div className='w-[1440px] mx-auto'>
          <h1 className='text-[32px] leading-10'>Job Search</h1>
        </div>
      </div>

      <div className='w-full bg-base-100 pt-5'>
        <form className='w-[1440px] mx-auto flex items-end gap-[30px]'>
          <div className='w-[516px] flex-1'>
            <label htmlFor='keywords' className='text-md leading-none'>
              Role
            </label>
            <div className='mt-3 h-14 flex items-center outline outline-2 outline-base-content has-[input:focus-within]:outline-primary rounded-3xl px-5'>
              <input
                type='text'
                id='keywords'
                placeholder='Job title, keywords, or company'
                defaultValue={keywords}
                className='block w-full bg-transparent focus:outline focus:outline-0'
              />
            </div>
          </div>
          <div className='w-[498px] flex-1'>
            <label htmlFor='location' className='text-md leading-none'>
              Location
            </label>
            <div className='mt-3 h-14 flex-1 flex items-center outline outline-2 outline-base-content has-[input:focus-within]:outline-primary rounded-3xl px-5'>
              <input
                type='text'
                id='location'
                placeholder='City, state, or remote'
                defaultValue={location}
                className='block w-full bg-transparent focus:outline focus:outline-0'
              />
            </div>
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
    </>
  );
};
