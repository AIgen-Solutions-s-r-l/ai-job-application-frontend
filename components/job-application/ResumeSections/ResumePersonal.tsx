import React from 'react';
import { Resume } from '../trash/application.types';
import { useFormContext } from 'react-hook-form';
import { NullifiedInput } from '@/components/ui/nullified-input';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const ResumePersonal: React.FC = () => {
  const { register, getValues } = useFormContext<Resume>();
  const linkedin: string = getValues('personalInfo.linkedin');
  const github: string = getValues('personalInfo.github');
  
  return (
    <div className="flex flex-col gap-4" id="personal_section">
      <div className="flex flex-col items-center">
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
        <ul className="mt-3 text-gray-700 text-xs flex flex-row gap-2 list-none">
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
            <a href={linkedin} className="text-blue-500" target="_blank">Linkedin</a>
          </li>
          <li className="flex gap-[2px]">
            <FaGithub size={16} />
            <a href={github} className="text-blue-500" target="_blank">Github</a>
          </li>
        </ul>
      </div>
    </div>
  );
};