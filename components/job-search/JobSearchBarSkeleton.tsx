import { ChevronDown, Search } from 'lucide-react';
import { FC } from 'react';
import { Container } from '../Container';

interface Props {
  keywords?: string;
  location?: string;
}

export const JobSearchBarSkeleton: FC<Props> = ({keywords, location}) => {
  return (
    <Container>
      <div className='hidden lg:block w-full'>
        <h1 className='font-montserrat text-[28px] leading-[1.1] font-semibold'>Search Jobs</h1>
      </div>

      <div className='w-full md:pt-5'>
        <form
          className='flex flex-col md:flex-row md:items-end md:gap-4 xl:gap-[30px] font-jura font-semibold'
        >
          <div className='flex-1'>
            <label htmlFor='q' className='hidden md:block text-base leading-none'>
              Role
            </label>
            <div className='mt-3 h-12 flex bg-white items-center border border-1 border-neutral has-[input:focus-within]:border-primary rounded-md px-5'>
              <input
                type='text'
                id='q'
                placeholder='Job title, keywords, or company'
                defaultValue={keywords}
                autoComplete='off'
                className='block w-full bg-transparent focus:outline focus:outline-0'
              />
            </div>
          </div>

          <div className='relative flex-1'>
            <label htmlFor='location' className='hidden md:block text-base leading-none'>
              Location
            </label>
            <div className='mt-3 h-12 flex-1 bg-white flex items-center border border-1 border-neutral has-[input:focus-within]:border-primary rounded-md px-5'>
              <input
                type='text'
                id='location'
                placeholder='City, state, or remote'
                defaultValue={location}
                autoComplete='off'
                className='block w-full bg-transparent focus:outline focus:outline-0'
              />
            </div>
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
        </form>
      </div>
    </Container>
  );
};
