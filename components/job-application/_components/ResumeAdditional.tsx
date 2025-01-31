import React, { useCallback } from 'react';
import { Resume } from '../../../libs/types/application.types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Link from 'next/link';
import { NullifiedInput } from '@/components/ui/nullified-input';
import TextareaAutosize from 'react-textarea-autosize';
import { cn } from '@/lib/utils';
import { EntryOperator } from './EntryOperator';
import { useActiveSectionContext } from '../../../contexts/active-section-context';
import { useCVTemplateContext } from '../../../contexts/cv-template-context';

type FormData = Pick<Resume, "additionalInfo">

const SkillsNestedFieldArray: React.FC = () => {
  const { getValues, setValue } = useFormContext<FormData>();
  const additional_skills = getValues('additionalInfo.additional_skills');
  const { activeSection, setActiveSection } = useActiveSectionContext();
  const isActive = activeSection === 'skills-section';
  const { template } = useCVTemplateContext();

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
          template.additional.skills,
          'border-2 border-transparent hover:border-primary has-[:focus]:border-primary',
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
  const { template } = useCVTemplateContext();

  const handleAddAchievement = () => {
    const newIndex = fields.length;
    append({
      language: "",
      description: "",
    });
    setActiveSection(`${section}-${newIndex}`);
  }

  return fields.length ? (
    <div className={template.additional.languages}>
      <span className="font-semibold">Languages: </span>
      {fields.map((item, index) => {
        const activeIndex = `${section}-${index}`

        return (
          <div
            key={item.id}
            data-section={activeIndex}
            className={cn(
              template.additional.languageItem,
              'relative border-2 border-transparent hover:border-primary',
              activeIndex === activeSection ? 'bg-white border-primary' : 'border-transparent'
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
  const { template } = useCVTemplateContext();

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
    <div className={template.projects.container}>
      <h2 className={template.projects.h2}>
        Side Projects
      </h2>
      {fields.map((exp, index) => {
        const activeIndex = `${section}-${index}`

        return (
          <div
            key={exp.id}
            data-section={activeIndex}
            className={cn(
              template.projects.entry,
              'relative border-2 hover:border-primary',
              activeIndex === activeSection ? 'bg-white border-primary' : 'border-transparent'
            )}
            onClick={(e) => {
              e.stopPropagation();
              setActiveSection(activeIndex);
            }}
          >
            <div className={template.projects.entryHeader}>
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
                    className='text-blue-500'
                  />
                </Link>
              )}
            </div>

            <ul className={template.projects.compactList}>
              <li>
                <TextareaAutosize
                  {...register(`additionalInfo.side_projects.${index}.description`)}
                  minRows={1}
                  placeholder="Project Description"
                  className="w-full align-top grow leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
                />
              </li>
            </ul>
          </div>
        )
      })}
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
  const { template } = useCVTemplateContext();

  const handleAddAchievement = () => {
    const newIndex = fields.length;
    append({
      name: "",
      description: "",
    });
    setActiveSection(`${section}-${newIndex}`);
  }

  return fields.length ? (
    <div className={template.achievements.container}>
      <h2 className={template.achievements.h2}>
        Achievements
      </h2>
      {fields.map((exp, index) => {
        const activeIndex = `${section}-${index}`

        return (
          <div
            key={exp.id}
            data-section={activeIndex}
            className={cn(
              template.achievements.entry,
              'relative border-2 hover:border-primary',
              activeIndex === activeSection ? 'bg-white border-primary' : 'border-transparent'
            )}
            onClick={(e) => {
              e.stopPropagation();
              setActiveSection(activeIndex);
            }}
          >
            <div className={template.achievements.entryHeader}>
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
              />
            </div>
            <ul className={template.achievements.compactList}>
              <li>
                <TextareaAutosize
                  {...register(`additionalInfo.achievements.${index}.description`)}
                  minRows={1}
                  placeholder="Achievement Description"
                  className="w-full align-top grow leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
                />
              </li>
            </ul>
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
  const { template } = useCVTemplateContext();

  const handleAddCertification = () => {
    const newIndex = fields.length;
    append({
      name: "",
      description: "",
    });
    setActiveSection(`${section}-${newIndex}`);
  }

  return fields.length ? (
    <div className={template.certifications.container}>
      <h2 className={template.certifications.h2}>
        Certifications
      </h2>
      {fields.map((exp, index) => {
        const activeIndex = `${section}-${index}`

        return (
          <div
            key={exp.id}
            data-section={activeIndex}
            className={cn(
              template.certifications.entry,
              'relative border-2 hover:border-primary',
              activeIndex === activeSection ? 'bg-white border-primary' : 'border-transparent'
            )}
            onClick={(e) => {
              e.stopPropagation();
              setActiveSection(activeIndex);
            }}
          >
            <div className={template.certifications.entryHeader}>
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
              />
            </div>
            <ul className={template.certifications.compactList}>
              <li>
                <TextareaAutosize
                  {...register(`additionalInfo.certifications.${index}.description`)}
                  minRows={1}
                  placeholder="Certification Description"
                  className="w-full align-top grow leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
                />
              </li>
            </ul>
          </div>
        )
      })}
    </div>
  ) : null;
}

export const ResumeAdditional: React.FC = () => {
  const { template } = useCVTemplateContext();

  return <>
    <ProjectsNestedFieldArray />

    <AchievementsNestedFieldArray />

    <CertificationsNestedFieldArray />

    <div className={template.additional.container} id="skills-section">
      <h1 className={template.additional.h2}>
        Additional Information
      </h1>

      <SkillsNestedFieldArray />

      <LanguageNestedFieldArray />
    </div>
  </>
};