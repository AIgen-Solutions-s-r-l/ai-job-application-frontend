import React, { useCallback } from 'react';
import { Resume } from '../trash/application.types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Link from 'next/link';
import { NullifiedInput } from '@/components/ui/nullified-input';
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
    <div className="flex flex-wrap text-xs mt-6 gap-1 leading-none">
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
              'flex flex-col gap-1 pb-1 relative border-2 border-transparent pt-2 hover:border-secondary has-[:focus]:border-secondary bg-white', 
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
                <div className="flex flex-row items-start">
                  <NullifiedInput
                    {...register(`additionalInfo.side_projects.${index}.name`)}
                    placeholder="Project Name"
                    className='font-semibold'
                  />
                  &nbsp;&#8209;&nbsp;
                  <NullifiedInput
                    {...register(`additionalInfo.side_projects.${index}.link`)}
                    placeholder="Project Link"
                  />
                </div>
              </>
            ) : (
              <Link href={side_projects[index].link} target="_blank" rel="noopener noreferrer" className="font-normal inline text-blue-500 relative">
                <NullifiedInput
                  {...register(`additionalInfo.side_projects.${index}.name`)}
                  placeholder="Project Name"
                  className='text-blue-500 font-semibold'
                />
              </Link>
            )}
            <div className="flex flex-row">
              <span className='ml-3 mr-2'>•</span>
              <TextareaAutosize
                {...register(`additionalInfo.side_projects.${index}.description`)}
                minRows={1}
                placeholder="Project Description"
                className="grow leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
              />
            </div>
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

  const { setRef, activeIndex, setActiveIndex } = useNestedClickOutside<number>();

  const handleAddAchievement = () => {
    const newIndex = fields.length;
    append({
      name: "",
      description: "",
    });
    setActiveIndex(newIndex);
  }
 

  return fields.length ? (
    <div className="flex flex-wrap text-xs mt-2 gap-1 leading-none">
      <h1 className="text-xs font-semibold tracking-wide w-full border-b-4 border-black pb-2 uppercase">
        Achievements
      </h1>
      {activeIndex  !== null && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}
      <div className="flex flex-col w-full">
        {fields.map((exp, index) => (
          <div 
            key={exp.id}
            ref={(element) => setRef(index, element)}
            className={cn(
              'flex flex-col gap-1 pb-1 relative border-2 border-transparent pt-2 hover:border-secondary has-[:focus]:border-secondary bg-white', 
              activeIndex  === index  && 'border-secondary z-30'
            )}
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(index);
            }}
          >
            {activeIndex  === index && (
                <EntryOperator
                  itemsLength={fields.length}
                  onAdd={handleAddAchievement}
                  onRemove={() => {
                    remove(index);
                    setActiveIndex(null);
                  }}
                />
            )}
            <NullifiedInput
              {...register(`additionalInfo.achievements.${index}.name`)}
              placeholder="Achievement Name"
              className='font-semibold'
            />
            <div className="flex flex-row">
              <span className='ml-3 mr-2'>•</span>
              <TextareaAutosize
                {...register(`additionalInfo.achievements.${index}.description`)}
                minRows={1}
                placeholder="Achievement Description"
                className="grow leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
              />
            </div>
          </div>
          )
        )}
      </div>
    </div>
  ) : null;
}

const CertificationsNestedFieldArray: React.FC = (): React.ReactElement => {
  const { register } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ 
    name: `additionalInfo.certifications`
  })
  
  const { setRef, activeIndex, setActiveIndex } = useNestedClickOutside<number>();

  const handleAddCertification = () => {
    const newIndex = fields.length;
    append({
      name: "",
      description: "",
    });
    setActiveIndex(newIndex);
  }

  return fields.length ? (
    <div className="flex flex-wrap text-xs mt-2 gap-1 leading-none">
      <h1 className="text-xs font-semibold tracking-wide w-full border-b-4 border-black pb-2 uppercase">
        Certifications
      </h1>
      {activeIndex  !== null && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}
      <div className="flex flex-col w-full">
        {fields.map((exp, index) => (
          <div 
            key={exp.id}
            ref={(element) => setRef(index, element)}
            className={cn(
              'flex flex-col gap-1 pb-1 relative border-2 border-transparent pt-2 hover:border-secondary has-[:focus]:border-secondary bg-white', 
              activeIndex  === index  && 'border-secondary z-30'
            )}
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(index);
            }}
          >
            {activeIndex  === index && (
                <EntryOperator
                  itemsLength={fields.length}
                  onAdd={handleAddCertification}
                  onRemove={() => {
                    remove(index);
                    setActiveIndex(null);
                  }}
                />
            )}
            <NullifiedInput
              {...register(`additionalInfo.certifications.${index}.name`)}
              placeholder="Certification Name"
              className='font-semibold'
            />
            <div className="flex flex-row">
              <span className='ml-3 mr-2'>•</span>
              <TextareaAutosize
                {...register(`additionalInfo.certifications.${index}.description`)}
                minRows={1}
                placeholder="Certification Description"
                className="grow leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
              />
            </div>
          </div>
          )
        )}
      </div>
    </div>
  ) : null;
}

export const ResumeAdditional: React.FC = () => {
  return (
    <div className="" id="skills-section text-xs">
      <ProjectsNestedFieldArray />
      
      <AchievementsNestedFieldArray />

      <CertificationsNestedFieldArray />      
      
      <h1 className="mt-4 text-xs font-semibold tracking-wide w-full border-b-4 border-black pb-2 uppercase">
        Additional Information
      </h1>
      
      <SkillsNestedFieldArray />

      <LanguageNestedFieldArray />
    </div>
  );
};