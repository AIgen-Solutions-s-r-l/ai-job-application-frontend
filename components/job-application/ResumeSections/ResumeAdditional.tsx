import React, { useCallback, useState } from 'react';
import { Resume } from '../trash/application.types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Link from 'next/link';
import { NullifiedInput } from '@/components/ui/nullified-input';
import { Minus, Plus } from 'lucide-react';

type FormData = Pick<Resume, "additionalInfo">

const SkillsNestedFieldArray: React.FC = () => {
  const { getValues, setValue } = useFormContext<FormData>();
  const additional_skills = getValues('additionalInfo.additional_skills');

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeout: ReturnType<typeof setTimeout> | undefined; // Correct type
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const handleSkillsChange = useCallback(
    (value: string) => {
      const skillsArray = value.split(',').map(skill => skill.trim()).filter(Boolean);
      setValue(`additionalInfo.additional_skills`, skillsArray);
    },
    [setValue]
  );

  const debouncedHandleSkillsChange = useCallback(
    debounce(handleSkillsChange, 500), 
    [handleSkillsChange] 
  );

  return additional_skills.length ? (
    <div className="flex flex-wrap text-xs leading-none mt-2 gap-1">
      <span className="font-semibold">Technincal Skills: </span>
      <textarea
        onChange={(e) => debouncedHandleSkillsChange(e.target.value)} // Use the debounced function
        defaultValue={additional_skills ? additional_skills.join(', ') : ''}
        placeholder="e.g., React, TypeScript, Node.js, Git (separate skills with commas)"
        className="grow resize-none overflow-y-hidden border-b-2 border-transparent outline-none bg-transparent focus:outline-secondary placeholder-shown:border-black"
      />
    </div>
  ) : null;
}

const LanguageNestedFieldArray: React.FC = (): React.ReactElement => {
  const { getValues, setValue } = useFormContext<FormData>();
  const languages = getValues('additionalInfo.languages');
  const refinedArray = languages.map((lang) => lang.language);

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeout: ReturnType<typeof setTimeout> | undefined; // Correct type
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const handleLanguagesChange = useCallback(
    (value: string) => {
      const languagesArray = value.split(',').map(language => language.trim()).filter(Boolean);
      const refined = languagesArray.map((lang) => (
        {
         "language": lang,
         "proficiency": 'native',
        }
      ));
      setValue(`additionalInfo.languages`, refined);
    },
    [setValue]
  );

  const debouncedHandleLanguagesChange = useCallback(
    debounce(handleLanguagesChange, 500), 
    [handleLanguagesChange] 
  );

  return refinedArray.length ? (
    <div className="flex flex-wrap text-xs leading-none mt-2 gap-1">
      <span className="font-semibold">Languages: </span>
      <textarea
        onChange={(e) => debouncedHandleLanguagesChange(e.target.value)} // Use the debounced function
        defaultValue={refinedArray ? refinedArray.join(', ') : ''}
        placeholder="Language"
        rows={1}
        className="grow resize-none overflow-y-hidden border-b-2 border-transparent outline-none bg-transparent focus:outline-secondary placeholder-shown:border-black"
      />
    </div>
  ) : null;
}

const ProjectsNestedFieldArray: React.FC = (): React.ReactElement => {
  const { register, getValues } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ 
    name: `additionalInfo.side_projects`
  })
  const side_projects = getValues('additionalInfo.side_projects');

  const handleAddProject = () =>
    append({
      name: "",
      description: "",
      link: "",
    }
  );

  return fields.length ? (
    <div className="flex flex-wrap text-xs mt-2 gap-1 leading-none">
      <span className="font-semibold">Projects: </span>
      <ul className="list-disc list-inside ml-4 w-full relative">
        {fields.map((exp, index) => (
          <li className="pb-1 flex items-start relative" key={exp.id}>
            <div className="absolute top-0 -left-6 w-8 h-8 items-center gap-10 group">
              {<button 
                className={fields.length === 1 ? 'hidden' : 'hidden group-hover:flex'}
                onClick={() => remove(index)}
              >
                <Minus className='font-bold text-base-content' size={16} strokeWidth={4}  />
              </button>}
            </div>
            <Link href={side_projects[index].link} target="_blank" rel="noopener noreferrer" className="font-normal text-blue-500 relative">
              <NullifiedInput
                {...register(`additionalInfo.side_projects.${index}.name`)}
                placeholder="Project Name"
              />
            </Link>
            &nbsp;&#8209;&nbsp;
            <textarea
              {...register(`additionalInfo.side_projects.${index}.description`)}
              placeholder="Project Description"
              className="grow resize-none overflow-y-hidden border-b-2 border-transparent outline-none bg-transparent focus:outline-secondary placeholder-shown:border-black"
            />
          </li>
          )
        )}
        <div className="absolute -bottom-6 -left-6 w-8 h-8 items-center gap-10 group">
          {<button 
            className='hidden group-hover:flex'
            onClick={handleAddProject}
          >
            <Plus className='font-bold text-base-content' size={16} strokeWidth={3}  />
          </button>}
        </div>
      </ul>
    </div>
  ) : null;
}

const AchievementsNestedFieldArray: React.FC = (): React.ReactElement => {
  const { register } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ 
    name: `additionalInfo.achievements`
  })

  const handleAddAchievement = () =>
    append({
      name: "",
      description: "",
    }
  );

  return fields.length ? (
    <div className="flex flex-wrap text-xs mt-2 gap-1 leading-none">
      <span className="font-semibold">Achievements: </span>
      <ul className="list-disc list-inside ml-4 w-full relative">
        {fields.map((exp, index) => (
          <li className="pb-1 flex items-start relative" key={exp.id}>
            <div className="absolute top-0 -left-6 w-8 h-8 items-center gap-10 group">
              {<button 
                className={fields.length === 1 ? 'hidden' : 'hidden group-hover:flex'}
                onClick={() => remove(index)}
              >
                <Minus className='font-bold text-base-content' size={16} strokeWidth={4}  />
              </button>}
            </div>
            <NullifiedInput
              {...register(`additionalInfo.achievements.${index}.name`)}
              placeholder="Achievement Name"
            />
            :&nbsp;
            <textarea
              {...register(`additionalInfo.achievements.${index}.description`)}
              placeholder="Achievement Description"
              className="grow resize-none overflow-y-hidden border-b-2 border-transparent outline-none bg-transparent focus:outline-secondary placeholder-shown:border-black"
            />
          </li>
          )
        )}
        <div className="absolute -bottom-6 -left-6 w-8 h-8 items-center gap-10 group">
          {<button 
            className='hidden group-hover:flex'
            onClick={handleAddAchievement}
          >
            <Plus className='font-bold text-base-content' size={16} strokeWidth={3}  />
          </button>}
        </div>
      </ul>
    </div>
  ) : null;
}

const CertificationsNestedFieldArray: React.FC = (): React.ReactElement => {
  const { register } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ 
    name: `additionalInfo.certifications`
  })
  
  const handleAddCertification = () =>
    append({
      name: "",
      description: "",
    }
  );

  return fields.length ? (
    <div className="flex flex-wrap text-xs mt-2 gap-1 leading-none">
      <span className="font-semibold">Certifications: </span>
      <ul className="list-disc list-inside ml-4 w-full relative">
        {fields.map((exp, index) => (
          <li className="pb-1 flex items-start relative" key={exp.id}>
            <div className="absolute top-0 -left-6 w-8 h-8 items-center gap-10 group">
              {<button 
                className={fields.length === 1 ? 'hidden' : 'hidden group-hover:flex'}
                onClick={() => remove(index)}
              >
                <Minus className='font-bold text-base-content' size={16} strokeWidth={4}  />
              </button>}
            </div>
            <NullifiedInput
              {...register(`additionalInfo.certifications.${index}.name`)}
              placeholder="Certification Name"
            />
            :&nbsp;
            <textarea
              {...register(`additionalInfo.certifications.${index}.description`)}
              placeholder="Certification Description"
              className="grow resize-none overflow-y-hidden border-b-2 border-transparent outline-none bg-transparent focus:outline-secondary placeholder-shown:border-black"
            />
          </li>
          )
        )}
        <div className="absolute -bottom-6 -left-6 w-8 h-8 items-center gap-10 group">
          {<button 
            className='hidden group-hover:flex'
            onClick={handleAddCertification}
          >
            <Plus className='font-bold text-base-content' size={16} strokeWidth={3}  />
          </button>}
        </div>
      </ul>
    </div>
  ) : null;
}

export const ResumeAdditional: React.FC = () => {
  return (
    <div className="mt-8" id="skills-section text-xs">
      <h1 className="text-xs font-semibold tracking-wide w-full border-b-4 border-black pb-2 uppercase">
        Additional Information
      </h1>
      
      <SkillsNestedFieldArray />

      <LanguageNestedFieldArray />

      <ProjectsNestedFieldArray />
      
      <AchievementsNestedFieldArray />

      <CertificationsNestedFieldArray />      
      {/* {achievements.length && (
        <div className="flex flex-wrap text-xs mt-2 gap-1 leading-none">
          <span className="font-semibold">Achievements: </span>
          <ul className="list-disc list-inside ml-4">
            {achievements.map((exp, index) => {
              return (
                <li className="pb-1" key={index}>
                  <span className="font-semibold">
                    {exp.name + ': '}
                  </span>
                  <p className="inline">{exp.description}</p>
                </li>
              )
            })}
          </ul>
        </div>
      )}
      {certifications.length && (
        <div className="flex flex-wrap text-xs mt-2 gap-1 leading-none">
          <span className="font-semibold">Certifications: </span>
          <ul className="list-disc list-inside ml-4">
            {certifications.map((exp, index) => {
              return (
                <li className="pb-1" key={index}>
                  <span className="font-semibold">
                    {exp.name + ': '}
                  </span>
                  <p className="inline">{exp.description}</p>
                </li>
              )
            })}
          </ul>
        </div>
      )} */}
    </div>
  );
};