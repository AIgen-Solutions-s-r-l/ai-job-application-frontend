'use client';

import React from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useJobSearch } from '@/contexts/job-search-context';

interface JobSearchBarProps {
  onSearch: (keywords: string, location: string) => void;
}

export const JobSearchBar: React.FC<JobSearchBarProps> = ({ onSearch }) => {
  const { register, handleSubmit } = useForm<{ keywords: string; location: string }>();
  const { jobs } = useJobSearch();

  const onSubmit = (data: { keywords: string; location: string }) => {
    onSearch(data.keywords, data.location);
  };

  return <>
    <div className="w-full bg-base-100">
      <div className="w-[1440px] mx-auto">
        <h1 className='text-[32px] leading-10'>Job Search</h1>
      </div>
    </div>

    <div className="w-full bg-base-100 pt-5">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[1440px] mx-auto flex items-end gap-[30px]">
        <div className="w-[516px] flex-1">
          <label htmlFor="keywords" className='text-md leading-none'>Role</label>
          <div className="mt-3 h-14 flex items-center outline outline-2 outline-base-content has-[input:focus-within]:outline-primary rounded-3xl px-5">
            <input
              type="text"
              id="keywords"
              placeholder="Job title, keywords, or company"
              {...register("keywords")}
              className="block w-full bg-transparent focus:outline focus:outline-0"
            />
          </div>
        </div>
        <div className="w-[498px] flex-1">
          <label htmlFor="location" className='text-md leading-none'>Location</label>
          <div className="mt-3 h-14 flex-1 flex items-center outline outline-2 outline-base-content has-[input:focus-within]:outline-primary rounded-3xl px-5">
            <input
              type="text"
              id="location"
              placeholder="City, state, or remote"
              {...register("location")}
              className="block w-full bg-transparent focus:outline focus:outline-0"
            />
          </div>
        </div>
        <div className="w-[222px] h-14 flex-0 flex items-center outline outline-2 outline-base-content text-base-content hover:text-white hover:outline-primary hover:bg-primary rounded-3xl">
          <button type="submit" className="w-full h-full flex items-center justify-between pl-5">
            <p className='text-md'>Search</p>
            <Search className="mx-4" size={27} />
          </button>
        </div>
      </form>

      <div className="w-[1440px] mx-auto pb-5">
        <div className="mt-5 flex gap-5 text-base">
          <select className="select bg-neutral-content focus:outline-none w-[150px] h-9 rounded-full flex gap-5 items-center">
            <option disabled selected>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
          </select>
          <select className="select bg-neutral-content focus:outline-none w-[150px] h-9 rounded-full flex gap-5 items-center">
            <option disabled selected>Remote</option>
            <option>On-site</option>
          </select>
          <select className="select bg-neutral-content focus:outline-none w-[150px] h-9 rounded-full flex gap-5 items-center">
            <option disabled selected>English</option>
            <option>Russian</option>
          </select>
        </div>
      </div>
    </div>

    <div className="w-full bg-base-100">
      <div className="w-[1440px] mx-auto pb-5">
        <p className="text-lg">Your suggested jobs based on your resume: <span className="font-semibold">{jobs.length} jobs</span> are found.</p>
      </div>
    </div>
  </>;
};