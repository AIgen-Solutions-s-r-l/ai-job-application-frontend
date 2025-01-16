import React, { useCallback, useState } from 'react';
import { Resume } from '../trash/application.types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Link from 'next/link';
import { NullifiedInput } from '@/components/ui/nullified-input';
import { Minus, Plus } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { useClickOutside, useNestedClickOutside } from '@/libs/hooks/useClickOutside';
import { cn } from '@/lib/utils';
import { EntryOperator } from './EntryOperator';

type FormData = Pick<Resume, "additionalInfo">

const SkillsNestedFieldArray: React.FC = () => {
  const { getValues, setValue } = useFormContext<FormData>();
  const additional_skills = getValues('additionalInfo.additional_skills');
  const { ref, isActive, setIsActive } = useClickOutside();

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
    <>
      {isActive && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}
      <div 
        className={cn(
          'flex flex-wrap text-xs leading-none mt-2 gap-1 bg-white relative border-2 border-transparent hover:border-secondary has-[:focus]:border-secondary', 
          isActive && 'border-secondary z-30'
        )}
        ref={ref}
        onClick={() => setIsActive(true)}
      >
        <span className="font-semibold">Technincal Skills: </span>
        <TextareaAutosize
          minRows={1}
          onChange={(e) => debouncedHandleSkillsChange(e.target.value)}
          defaultValue={additional_skills ? additional_skills.join(', ') : ''}
          placeholder="e.g., React, TypeScript, Node.js, Git (separate skills with commas)"
          className="grow resize-none overflow-y-hidden outline-none bg-transparent"
        />
      </div>
    </>
  ) : null;
}

const LanguageNestedFieldArray: React.FC = (): React.ReactElement => {
  const { register } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ 
    name: `additionalInfo.languages`
  })

  const { setRef, activeIndex, setActiveIndex } = useNestedClickOutside<number>();
  
  const handleAddAchievement = () => {
    const newIndex = fields.length;
    append({
      language: "",
      description: "",
    });
    setActiveIndex(newIndex);
  }

  return fields.length ? (
    <div className="flex flex-wrap text-xs leading-none mt-2 gap-1">
      <span className="font-semibold mt-[3px]">Languages: </span>
      {activeIndex !== null && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}
      {fields.map((item, index) => (
        <div 
          key={item.id} 
          ref={(element) => setRef(index, element)}
          className={cn(
            'flex items-center align-top relative border-2 border-transparent hover:border-secondary has-[:focus]:border-secondary bg-white', 
            activeIndex === index  && 'border-secondary z-30'
          )}
          onClick={(e) => {
            e.stopPropagation();
            setActiveIndex(index);
          }}
        >
          {activeIndex === index && (
            <EntryOperator
              itemsLength={fields.length}
              onAdd={handleAddAchievement}
              onRemove={() => {
                remove(index);
                setActiveIndex(null);
              }}
              small
            />
          )}
          <NullifiedInput
            {...register(`additionalInfo.languages.${index}.language`)}
            placeholder="Language"
            className='mr-1 leading-none'
          />
          (<NullifiedInput
            {...register(`additionalInfo.languages.${index}.proficiency`)}
            placeholder="Proficiency"
            className='leading-none'
          />)
          {index === fields.length - 1 ? '.' : ', '}
        </div>
      ))}
    </div>
  ) : null;
}

const ProjectsNestedFieldArray: React.FC = (): React.ReactElement => {
  const { register, getValues } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ 
    name: `additionalInfo.side_projects`
  })
  const side_projects = getValues('additionalInfo.side_projects');
  const { setRef, activeIndex, setActiveIndex } = useNestedClickOutside<number>();

  const handleAddProject = () => {
    const newIndex = fields.length;
    append({
      name: "",
      description: "",
      link: "",
    });
    setActiveIndex(newIndex);
  }

  return fields.length ? (
    <div className="flex flex-wrap text-xs mt-2 gap-1 leading-none">
      <h1 className="text-xs font-semibold tracking-wide w-full border-b-4 border-black pb-2 uppercase">
        Side Projects
      </h1>
      {activeIndex  !== null && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}
      <div className="flex flex-col w-full"> 
        {fields.map((exp, index) => (
          <div 
            key={exp.id}
            ref={(element) => setRef(index, element)}
            className={cn(
              'flex flex-row items-start pb-1 relative border-2 border-transparent pt-2 hover:border-secondary has-[:focus]:border-secondary bg-white', 
              activeIndex  === index  && 'border-secondary z-30'
            )}
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(index);
            }}
          >
            {activeIndex  === index ? (
              <>
                <EntryOperator
                  itemsLength={fields.length}
                  onAdd={handleAddProject}
                  onRemove={() => {
                    remove(index);
                    setActiveIndex(null);
                  }}
                />
                <div className="relative">
                  <NullifiedInput
                    {...register(`additionalInfo.side_projects.${index}.name`)}
                    placeholder="Project Name"
                    className='leading-none h-[12px] text-blue-500'
                  />
                  <NullifiedInput
                    {...register(`additionalInfo.side_projects.${index}.link`)}
                    placeholder="Project Link"
                    className='absolute -top-[30px] left-0 leading-none h-[20px] p-2 bg-white z-30'
                  />
                </div>
              </>
            ) : (
              <>
                <Link href={side_projects[index].link} target="_blank" rel="noopener noreferrer" className="font-normal inline text-blue-500 relative">
                  <NullifiedInput
                    {...register(`additionalInfo.side_projects.${index}.name`)}
                    placeholder="Project Name"
                    className='inline leading-none h-[12px] text-blue-500'
                  />
                </Link>
              </>
            )}
            &nbsp;&#8209;&nbsp;
            <TextareaAutosize
              {...register(`additionalInfo.side_projects.${index}.description`)}
              minRows={1}
              placeholder="Project Description"
              className="grow leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
            />
          </div>
          )
        )}
      </div>
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