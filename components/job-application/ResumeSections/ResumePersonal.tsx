import React from 'react';
import { Resume } from '../trash/application.types';
import { useFormContext } from 'react-hook-form';
import { NullifiedInput } from '@/components/ui/nullified-input';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useClickOutside } from '@/libs/hooks/useClickOutside';
import { cn } from '@/lib/utils';

export const ResumePersonal: React.FC = () => {
  const { register, getValues } = useFormContext<Resume>();
  const linkedin: string = getValues('personalInfo.linkedin');
  const github: string = getValues('personalInfo.github');
  const { ref, isActive, setIsActive } = useClickOutside();
  
  return <>
    {isActive && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}
    <div 
      className={cn('flex flex-col items-center border-2 border-transparent has-[:focus]:border-secondary bg-white relative', isActive && 'border-secondary z-30')}
      id="personal_section"
      ref={ref}
      onClick={() => setIsActive(true)}
    >
      <h1 className="font-semibold tracking-widest text-xl">
        <NullifiedInput
          {...register('personalInfo.name')}
          placeholder="Name"
        />
        &nbsp;
        <NullifiedInput
          {...register('personalInfo.surname')}
          placeholder="Surname"
        />
      </h1>
      <ul className="mt-3 text-gray-700 text-xs flex flex-row flex-wrap mx-auto gap-2 list-none">
        <li className="flex gap-[2px]">
          <MapPin size={16} />
          <NullifiedInput
            {...register('personalInfo.country')}
            placeholder="Country"
          />
          ,&nbsp;
          <NullifiedInput
            {...register('personalInfo.city')}
            placeholder="City"
          />
        </li>
        <li className="flex gap-[2px]">
          <Phone size={16} />
          <NullifiedInput
            {...register('personalInfo.phone_prefix')}
            placeholder="+1"
            className="min-w-1"
          />
          <NullifiedInput
            {...register('personalInfo.phone')}
            placeholder="1234567890"
          />
        </li>
        <li className="flex gap-[2px]">
          <Mail size={16} />
          <NullifiedInput
            {...register('personalInfo.email')}
            placeholder="Email"
          />
        </li>
        <li className="flex gap-[2px]">
          <FaLinkedin size={16} />
          {isActive ? (
            <NullifiedInput
              {...register('personalInfo.linkedin')}
              placeholder="Linkedin"
            />
          ) : (
            <a href={linkedin} className="text-blue-500" target="_blank">Linkedin</a>
          )}
        </li>
        <li className="flex gap-[2px]">
          <FaGithub size={16} />
          {isActive ? (
            <NullifiedInput
              {...register('personalInfo.github')}
              placeholder="GitHub"
            />
          ) : (
            <a href={github} className="text-blue-500" target="_blank">GitHub</a>
          )}
        </li>
      </ul>
    </div>
  </>;
};