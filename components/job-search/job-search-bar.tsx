'use client';

import React from 'react';
import { MapPin, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface JobSearchBarProps {
  onSearch: (keywords: string, location: string) => void;
}

export const JobSearchBar: React.FC<JobSearchBarProps> = ({ onSearch }) => {
  const { register, handleSubmit } = useForm<{ keywords: string; location: string }>();

  const onSubmit = (data: { keywords: string; location: string }) => {
    onSearch(data.keywords, data.location);
  };

  return (
    <div className="w-full sticky -top-5 z-50 bg-base-100 pt-5">
      <div className="w-[900px] mx-auto border-[1px] border-neutral-content rounded-xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-16 flex flex-col md:flex-row">
          <div className="flex items-center flex-grow outline outline-2 outline-transparent has-[input:focus-within]:outline-primary rounded-l-[10px] z-20">
            <Search className="text-gray-400 mx-4" size={27} />
            <input
              type="text"
              id="keywords"
              placeholder="Job title, keywords, or company"
              {...register("keywords")}
              className="block w-full bg-transparent focus:outline focus:outline-0"
            />
          </div>
          <div className="w-[1px] h-1/2 bg-neutral-content self-center z-10"></div>
          <div className="flex items-center flex-grow outline outline-2 outline-transparent has-[input:focus-within]:outline-primary rounded-r-[10px] z-20">
            <MapPin className="text-gray-400 mx-4" size={27}  />
            <input
              type="text"
              id="location"
              placeholder="City, state, or remote"
              {...register("location")}
              className="block w-full bg-transparent focus:outline focus:outline-0"
            />
          </div>
          <div className="w-[100px] p-[10px]">
            <button type="submit" className="w-full h-full bg-primary text-white rounded-[10px]">
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="w-[calc(100%+48px)] -translate-x-[24px] h-[1px] bg-neutral-content mt-5"></div>
    </div>
  );
};