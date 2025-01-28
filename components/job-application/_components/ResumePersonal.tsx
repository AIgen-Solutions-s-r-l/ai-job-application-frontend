import React from 'react';
import { Resume } from '../../../libs/types/application.types';
import { useFormContext } from 'react-hook-form';
import { NullifiedInput } from '@/components/ui/nullified-input';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { useActiveSectionContext } from '../../../contexts/active-section-context';
import { useCVTemplateContext } from './cv-template-context';

export const ResumePersonal: React.FC = () => {
  const { register, getValues } = useFormContext<Resume>();
  const linkedin: string = getValues('personalInfo.linkedin');
  const github: string = getValues('personalInfo.github');
  const { activeSection, setActiveSection } = useActiveSectionContext();
  const isActive = activeSection === 'personal-section';
  const { template } = useCVTemplateContext();
  
  return <>
    <div 
      data-section="personal-section"
      className={cn(
        'border-2 hover:border-secondary', 
        isActive ? 'bg-white border-secondary' : 'border-transparent',
        template.personal.header,
      )}
      onClick={() => setActiveSection('personal-section')}
    >
      <h1 className={template.personal.h1}>
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
      <div className={template.personal.contactSection}>
        <p className={template.personal.contactItem}>
          {/* <MapPin size={16} /> */}
          <NullifiedInput
            {...register('personalInfo.country')}
            placeholder="Country"
          />
          ,&nbsp;
          <NullifiedInput
            {...register('personalInfo.city')}
            placeholder="City"
          />
        </p>
        <p className={template.personal.contactItem}>
          {/* <Phone size={16} /> */}
          <NullifiedInput
            {...register('personalInfo.phone_prefix')}
            placeholder="+1"
            className="min-w-1"
          />
          <NullifiedInput
            {...register('personalInfo.phone')}
            placeholder="1234567890"
          />
        </p>
        <p className={template.personal.contactItem}>
          {/* <Mail size={16} /> */}
          <NullifiedInput
            {...register('personalInfo.email')}
            placeholder="Email"
          />
        </p>
        <p className={template.personal.contactItem}>
          {/* <FaLinkedin size={16} /> */}
          {isActive ? (
            <NullifiedInput
              {...register('personalInfo.linkedin')}
              placeholder="Linkedin"
            />
          ) : (
            <a href={linkedin} className="text-blue-500" target="_blank">Linkedin</a>
          )}
        </p>
        <p className={template.personal.contactItem}>
          {/* <FaGithub size={16} /> */}
          {isActive ? (
            <NullifiedInput
              {...register('personalInfo.github')}
              placeholder="GitHub"
            />
          ) : (
            <a href={github} className="text-blue-500" target="_blank">GitHub</a>
          )}
        </p>
      </div>
    </div>
  </>;
};