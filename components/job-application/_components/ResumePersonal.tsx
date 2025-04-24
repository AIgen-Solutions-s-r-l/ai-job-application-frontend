import { ChangeEvent, FC, useState } from 'react';
import { Resume } from '../../../libs/types/application.types';
import { useFormContext } from 'react-hook-form';
import { NullifiedInput } from '@/components/ui/nullified-input';
import { cn } from '@/lib/utils';
import { useActiveSectionContext } from '../../../contexts/active-section-context';
import { useCVTemplateContext } from '../../../contexts/cv-template-context';

export const ResumePersonal: FC = () => {
  const { register, getValues, setValue } = useFormContext<Resume>();
  const linkedin: string = getValues('personalInfo.linkedin');
  const github: string = getValues('personalInfo.github');
  const [showLinkedin, setShowLinkedin] = useState(!!linkedin);
  const [showGithub, setShowGithub] = useState(!!github);
  const { activeSection, setActiveSection } = useActiveSectionContext();
  const isActive = activeSection === 'personal-section';
  const { template } = useCVTemplateContext();

  const handleLinkedInToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setShowLinkedin(e.target.checked);
    if (!e.target.checked) {
      setValue('personalInfo.linkedin', '');
    }
  };

  const handleGithubToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setShowGithub(e.target.checked);
    if (!e.target.checked) {
      setValue('personalInfo.github', '');
    }
  };

  return <>
    <div
      data-section="personal-section"
      className={cn(
        'entry-border relative',
        isActive ? 'entry-active' : 'border-transparent',
        template.personal.header,
      )}
      onClick={() => setActiveSection('personal-section')}
    >
      {activeSection === 'personal-section' && (
        <div className='entry-operator-container'>
          <label className="flex items-center gap-2 cursor-pointer px-4 bg-primary-light-purple-gray text-base font-jura font-bold">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={showLinkedin}
              onChange={handleLinkedInToggle}
            />
            <span>LinkedIn</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer px-4 bg-my-neutral-3 text-base font-jura font-bold">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={showGithub}
              onChange={handleGithubToggle}
            />
            <span>GitHub</span>
          </label>
        </div>
      )}
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
          {/* <Phone size={16} /> */}
          <NullifiedInput
            {...register('personalInfo.phone_prefix')}
            placeholder="+1"
            className="min-w-1 max-w-10 small-autocomplete"
          />
          <NullifiedInput
            {...register('personalInfo.phone')}
            placeholder="1234567890"
            className="min-w-2 max-w-28 small-autocomplete"
          />
        </p>
        <p className={template.personal.contactItem}>
          {/* <Mail size={16} /> */}
          <NullifiedInput
            {...register('personalInfo.email')}
            placeholder="Email"
          />
        </p>
        {showLinkedin && (
          <p className={template.personal.contactItem}>
            {isActive ? (
              <NullifiedInput
                {...register('personalInfo.linkedin')}
                placeholder="Linkedin"
              />
            ) : (
              <a href={linkedin} className="text-blue-500" target="_blank">Linkedin</a>
            )}
          </p>
        )}
        {showGithub && (
          <p className={template.personal.contactItem}>
            {isActive ? (
              <NullifiedInput
                {...register('personalInfo.github')}
                placeholder="GitHub"
              />
            ) : (
              <a href={github} className="text-blue-500" target="_blank">GitHub</a>
            )}
          </p>
        )}
      </div>
    </div>
  </>;
};