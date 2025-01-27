import React, { useCallback } from 'react';
import { Resume } from '../../../libs/types/application.types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Link from 'next/link';
import { NullifiedInput } from '@/components/ui/nullified-input';
import TextareaAutosize from 'react-textarea-autosize';
import { cn } from '@/lib/utils';
import { EntryOperator } from './EntryOperator';
import { useActiveSectionContext } from '../../../contexts/active-section-context';

type FormData = Pick<Resume, "additionalInfo">

const SkillsNestedFieldArray: React.FC = () => {
  const { getValues, setValue } = useFormContext<FormData>();
  const additional_skills = getValues('additionalInfo.additional_skills');
  const { activeSection, setActiveSection } = useActiveSectionContext();
  const isActive = activeSection === 'skills-section';

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
      <div 
        data-section="skills-section"
        className={cn(
          'flex text-xs leading-none p-[10px] -mx-[10px] gap-1 border-2 border-transparent hover:border-secondary has-[:focus]:border-secondary', 
          isActive && 'bg-white'
        )}
        onClick={() => setActiveSection('skills-section')}
      >
        <span className="font-semibold">Skills: </span>
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

  const { activeSection, setActiveSection } = useActiveSectionContext();
  const section = 'languages-section';
  
  const handleAddAchievement = () => {
    const newIndex = fields.length;
    append({
      language: "",
      description: "",
    });
    setActiveSection(`${section}-${newIndex}`);
  }

  return fields.length ? (
    <div className="flex text-xs leading-none gap-1">
      <span className="font-semibold mt-2">Languages: </span>
      {fields.map((item, index) => {
        const activeIndex = `${section}-${index}`
        
        return (
          <div 
            key={item.id} 
            data-section={activeIndex}
            className={cn(
              'flex items-center py-[5px] relative border-2 border-transparent hover:border-secondary', 
              activeIndex === activeSection ? 'bg-white border-secondary' : 'border-transparent'
            )}
            onClick={(e) => {
              e.stopPropagation();
              setActiveSection(activeIndex);
            }}
          >
            {activeIndex === activeSection && (
              <EntryOperator
                itemsLength={fields.length}
                onAdd={handleAddAchievement}
                onRemove={() => {
                  remove(index);
                  setActiveSection(null);
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
            {index === fields.length - 1 ? '.' : ','}
          </div>
        )
      })}
    </div>
  ) : null;
}

const ProjectsNestedFieldArray: React.FC = (): React.ReactElement => {
  const { register, getValues } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ 
    name: `additionalInfo.side_projects`
  })
  const side_projects = getValues('additionalInfo.side_projects');

  const { activeSection, setActiveSection } = useActiveSectionContext();
  const section = 'projects-section';

  const handleAddProject = () => {
    const newIndex = fields.length;
    append({
      name: "",
      description: "",
      link: "",
    });
    setActiveSection(`${section}-${newIndex}`);
  }

  return fields.length ? (
    <div className="">
      <h2 className="text-2xl font-bold border-b border-solid border-black">
        Side Projects
      </h2>
      {fields.map((exp, index) => {
        const activeIndex = `${section}-${index}`
        
        return (
          <div 
            key={exp.id}
            data-section={activeIndex}
            className={cn(
              'flex flex-col gap-[5px] p-[10px] -mx-[10px] relative border-2 border-transparent hover:border-secondary', 
              activeIndex === activeSection ? 'bg-white border-secondary' : 'border-transparent'
            )}
            onClick={(e) => {
              e.stopPropagation();
              setActiveSection(activeIndex);
            }}
          >
            <div className="flex items-center">
              {activeIndex === activeSection ? (
                <>
                  <EntryOperator
                    itemsLength={fields.length}
                    onAdd={handleAddProject}
                    onRemove={() => {
                      remove(index);
                      setActiveSection(null);
                    }}
                  />
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
            </div>

            <div className="flex items-center text-xs">
              <span className='ml-3 mr-2'>•</span>
              <TextareaAutosize
                {...register(`additionalInfo.side_projects.${index}.description`)}
                minRows={1}
                placeholder="Project Description"
                className="grow leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
              />
            </div>
          </div>
      )})}
    </div>
  ) : null;
}

const AchievementsNestedFieldArray: React.FC = (): React.ReactElement => {
  const { register } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ 
    name: `additionalInfo.achievements`
  })

  const { activeSection, setActiveSection } = useActiveSectionContext();
  const section = 'achievements-section';

  const handleAddAchievement = () => {
    const newIndex = fields.length;
    append({
      name: "",
      description: "",
    });
    setActiveSection(`${section}-${newIndex}`);
  }
 
  return fields.length ? (
    <div className="">
      <h2 className="text-2xl font-bold border-b border-solid border-black">
        Achievements
      </h2>
      {fields.map((exp, index) => {
        const activeIndex = `${section}-${index}`
        
        return (
          <div 
            key={exp.id}
            data-section={activeIndex}
            className={cn(
              'flex flex-col gap-[5px] p-[10px] -mx-[10px] relative border-2 border-transparent hover:border-secondary', 
            activeIndex === activeSection ? 'bg-white border-secondary' : 'border-transparent'
            )}
            onClick={(e) => {
              e.stopPropagation();
              setActiveSection(activeIndex);
            }}
          >
            <div className="flex items-center">
              {activeIndex === activeSection && (
                  <EntryOperator
                    itemsLength={fields.length}
                    onAdd={handleAddAchievement}
                    onRemove={() => {
                      remove(index);
                      setActiveSection(null);
                    }}
                  />
              )}
              <NullifiedInput
                {...register(`additionalInfo.achievements.${index}.name`)}
                placeholder="Achievement Name"
                className='font-semibold'
              />
            </div>
            <div className="flex items-center text-xs">
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
      })}
    </div>
  ) : null;
}

const CertificationsNestedFieldArray: React.FC = (): React.ReactElement => {
  const { register } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ 
    name: `additionalInfo.certifications`
  })
  
  const { activeSection, setActiveSection } = useActiveSectionContext();
  const section = 'certifications-section';

  const handleAddCertification = () => {
    const newIndex = fields.length;
    append({
      name: "",
      description: "",
    });
    setActiveSection(`${section}-${newIndex}`);
  }

  return fields.length ? (
    <div className="">
      <h2 className="text-2xl font-bold border-b border-solid border-black">
        Certifications
      </h2>
      {fields.map((exp, index) => {
        const activeIndex = `${section}-${index}`
        
        return (
          <div 
            key={exp.id}
            data-section={activeIndex}
            className={cn(
              'flex flex-col gap-[5px] p-[10px] -mx-[10px] relative border-2 border-transparent hover:border-secondary', 
            activeIndex === activeSection ? 'bg-white border-secondary' : 'border-transparent'
            )}
            onClick={(e) => {
              e.stopPropagation();
              setActiveSection(activeIndex);
            }}
          >
            <div className="flex items-center">
              {activeIndex === activeSection && (
                  <EntryOperator
                    itemsLength={fields.length}
                    onAdd={handleAddCertification}
                    onRemove={() => {
                      remove(index);
                      setActiveSection(null);
                    }}
                  />
              )}
              <NullifiedInput
                {...register(`additionalInfo.certifications.${index}.name`)}
                placeholder="Certification Name"
                className='font-semibold'
              />
            </div>
            <div className="flex items-center text-xs">
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
      })}
    </div>
  ) : null;
}

export const ResumeAdditional: React.FC = () => {
  return <>
    <ProjectsNestedFieldArray />

    <AchievementsNestedFieldArray />

    <CertificationsNestedFieldArray />      
    
    <div className="" id="skills-section text-xs">
      <h1 className="text-2xl font-bold border-b border-solid border-black">
        Additional Information
      </h1>
      
      <SkillsNestedFieldArray />

      <LanguageNestedFieldArray />
    </div>
  </>
};