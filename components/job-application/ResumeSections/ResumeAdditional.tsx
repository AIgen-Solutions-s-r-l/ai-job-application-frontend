import React, { useCallback } from 'react';
import { Resume } from '../trash/application.types';
import { useFormContext } from 'react-hook-form';
import Link from 'next/link';

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

export const ResumeAdditional: React.FC = () => {
  const { register, getValues } = useFormContext<FormData>();
  const additional_skills = getValues('additionalInfo.additional_skills');
  const languages = getValues('additionalInfo.languages');
  const side_projects = getValues('additionalInfo.side_projects');
  const achievements = getValues('additionalInfo.achievements');
  const certifications = getValues('additionalInfo.certifications');

  return (
    <div className="mt-8" id="skills-section text-xs">
      <h1 className="text-xs font-semibold tracking-wide w-full border-b-4 border-black pb-2 uppercase">
        Additional Information
      </h1>
      
      <SkillsNestedFieldArray />
      
      {languages.length && (
        <div className="flex flex-wrap text-xs mt-2 gap-1 leading-none">
          <span className="font-semibold">Languages: </span>
          {languages.map((exp, index) => {
            return (
              <p key={index} className="inline">{exp.language} ({exp.proficiency}){index !== languages.length - 1 ? ', ' : '.'}</p>
            )
          })}
        </div>
      )}
      {side_projects.length && (
        <div className="flex flex-wrap text-xs mt-2 gap-1 leading-none">
          <span className="font-semibold">Projects: </span>
          <ul className="list-disc list-inside ml-4">
            {side_projects.map((exp, index) => {
              return (
                <li className="pb-1" key={index}>
                  <Link href={exp.link} target="_blank" rel="noopener noreferrer" className="font-normal text-blue-500">
                    {exp.name} -
                  </Link>
                  <p className="inline ml-1">{exp.description}</p>
                </li>
              )
            })}
          </ul>
        </div>
      )}
      {achievements.length && (
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
      )}
    </div>
  );
};