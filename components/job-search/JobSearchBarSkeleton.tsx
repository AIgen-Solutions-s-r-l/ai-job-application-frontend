import { ChevronDown, Search } from 'lucide-react';
import { FC } from 'react';
import { Container } from '../Container';

interface Props {
  keywords?: string;
  location?: string;
  experience?: string;
}

export const JobSearchBarSkeleton: FC<Props> = ({keywords, location, experience}) => {
  return (
    <Container>
      <div className='hidden lg:block w-full'>
        <h1 className='font-montserrat text-[28px] leading-[1.1] font-semibold'>Search Jobs</h1>
      </div>

      <div className='w-full md:pt-5'>
        <form
          className=''
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
                  placeholder='City or Country'
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
          </div>

          <div className='flex items-center mt-3 md:pb-1 md:mt-5 gap-16'>
            {/* <p className='hidden md:block text-[20px] font-montserrat'>
              <span className='font-bold'>{jobs.length} jobs</span> matched.
            </p> */}
            {/* <div className='flex flex-wrap gap-2 lg:gap-8 text-base font-jura font-semibold'>
              <select
                defaultValue={experience}
                className='select bg-neutral-content focus:outline-none w-[170px] h-8 min-h-8 rounded-full flex gap-5 items-center'
              >
                <option value="">Experience level</option>
                <option value="Entry-level">Entry-level</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior-level">Senior-level</option>
                <option value="Executive-level">Executive-level</option>
              </select>
            </div> */}
          </div>
        </form>
      </div>
    </Container>
  );
};
