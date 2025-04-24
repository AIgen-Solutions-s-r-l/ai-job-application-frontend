import { FC, ReactElement, useCallback, KeyboardEvent } from 'react';
import { Resume } from '../../../libs/types/application.types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { NullifiedInput } from '@/components/ui/nullified-input';
import TextareaAutosize from 'react-textarea-autosize';
import { cn } from '@/lib/utils';
import { EntryOperator } from './EntryOperator';
import { useActiveSectionContext } from '../../../contexts/active-section-context';
import { useCVTemplateContext } from '../../../contexts/cv-template-context';

type FormData = Pick<Resume, "additionalInfo">

// const SkillsNestedFieldArray: FC = () => {
//   const { getValues, setValue } = useFormContext<FormData>();
//   const additional_skills = getValues('additionalInfo.additional_skills');
//   const { activeSection, setActiveSection } = useActiveSectionContext();
//   const isActive = activeSection === 'skills-section';
//   const { template } = useCVTemplateContext();

//   const debounce = (func: (...args: any[]) => void, delay: number) => {
//     let timeout: ReturnType<typeof setTimeout> | undefined; // Correct type
//     return (...args: any[]) => {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => func(...args), delay);
//     };
//   };

//   const handleSkillsChange = useCallback(
//     (value: string) => {
//       const skillsArray = value.split(',').map(skill => skill.trim()).filter(Boolean);
//       setValue(`additionalInfo.additional_skills`, skillsArray);
//     },
//     [setValue]
//   );

//   const debouncedHandleSkillsChange = useCallback(
//     debounce(handleSkillsChange, 500),
//     [handleSkillsChange]
//   );

//   return additional_skills.length ? (
//     <>
//       <div
//         data-section="skills-section"
//         className={cn(
//           template.additional.skills,
//           'border-2 border-transparent hover:border-primary has-[:focus]:border-primary',
//           isActive && 'bg-white'
//         )}
//         onClick={() => setActiveSection('skills-section')}
//       >
//         <span className="font-semibold">Skills: </span>
//         <TextareaAutosize
//           minRows={1}
//           onChange={(e) => debouncedHandleSkillsChange(e.target.value)}
//           defaultValue={additional_skills ? additional_skills.join(', ') : ''}
//           placeholder="e.g., React, TypeScript, Node.js, Git (separate skills with commas)"
//           className="grow resize-none overflow-y-hidden outline-none bg-transparent"
//         />
//       </div>
//     </>
//   ) : null;
// }

const LanguageNestedFieldArray: FC = (): ReactElement => {
  const { register } = useFormContext<FormData>();
  const { fields, append, insert, remove } = useFieldArray({
    name: `additionalInfo.languages`
  })

  const { activeSection, setActiveSection } = useActiveSectionContext();
  const section = 'languages-section';
  const { template } = useCVTemplateContext();

  const handleAddLanguage = () => {
    append({
      language: "",
      proficiency: "",
    });
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>, respIndex: number) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        insert(respIndex + 1, { language: "", proficiency: "" });
        setTimeout(() => {
          const nextInputId = `language-${respIndex + 1}`;
          const nextInput = document.getElementById(nextInputId) as HTMLInputElement | null;
          nextInput?.focus();
        }, 0);
      } else if (e.key === 'Backspace' && !e.currentTarget.value) {
        e.preventDefault();
        if (fields.length > 1) {
          remove(respIndex);
          setTimeout(() => {
            const prevInputId = `language-${respIndex - 1}`;
            const prevInput = document.getElementById(prevInputId) as HTMLInputElement | null;
            prevInput?.focus();
          }, 0);
        }
        remove(respIndex);
      }
    },
    [fields.length, insert, remove]
  );
  
  return fields.length ? (
    <div className={template.additional.languages}>
      <h3 className={template.additional.h3}>
        Languages
      </h3>

      <div 
        data-section={section}
        className={cn(
          template.additional.languageItem,
          'entry-border',
          section === activeSection ? 'entry-active' : 'border-transparent'
        )}
        onClick={(e) => {
          e.stopPropagation();
          setActiveSection(section);
        }}
      >
        {section === activeSection && (
          <EntryOperator
            itemsLength={fields.length}
            onAdd={handleAddLanguage}
            onRemove={() => {
              remove(fields.length - 1);
            }}
          />
        )}
        {fields.map((item, index) => (
          <div
            key={item.id}
            className={cn('inline', template.additional.languageItem)}
          >
            <NullifiedInput
              id={`language-${index}`}
              {...register(`additionalInfo.languages.${index}.language`)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              placeholder="Language"
              className='leading-none mr-1 max-w-40 small-autocomplete'
            />
            (<NullifiedInput
              {...register(`additionalInfo.languages.${index}.proficiency`)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              placeholder="Proficiency"
              className='leading-none max-w-40 small-autocomplete'
            />)
            {index === fields.length - 1 ? '.' : ', '}
          </div>
          )
        )}
      </div>
    </div>
  ) : null;
}

const ProjectsNestedFieldArray: FC = (): ReactElement => {
  const { register, getValues } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    name: `additionalInfo.projects`
  })
  const side_projects = getValues('additionalInfo.projects');

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
        Projects
      </h2>
      {fields.map((exp, index) => {
        const activeIndex = `${section}-${index}`

        return (
          <div
            key={exp.id}
            data-section={activeIndex}
            className={cn(
              template.projects.entry,
              'entry-border',
              activeIndex === activeSection ? 'entry-active' : 'border-transparent'
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
                    itemsLength={fields.length+1}
                    onAdd={handleAddProject}
                    onRemove={() => {
                      remove(index);
                      setActiveSection(null);
                    }}
                  />
                  <NullifiedInput
                    {...register(`additionalInfo.projects.${index}.name`)}
                    placeholder="Project Name"
                  />
                  &nbsp;&#8209;&nbsp;
                  <NullifiedInput
                    {...register(`additionalInfo.projects.${index}.link`)}
                    placeholder="Project Link"
                  />
                </>
              ) : (
                <a href={side_projects[index].link} target="_blank" rel="noopener noreferrer" className="font-normal inline relative">
                  <NullifiedInput
                    {...register(`additionalInfo.projects.${index}.name`)}
                    placeholder="Project Name"
                    className={cn(side_projects[index].link ? 'text-blue-500' : '')}
                  />
                </a>
              )}
            </div>

            <ul className={template.projects.compactList}>
              <li className={template.projects.listItem}>
                <TextareaAutosize
                  {...register(`additionalInfo.projects.${index}.description`)}
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

const AchievementsNestedFieldArray: FC = (): ReactElement => {
  const { register } = useFormContext<FormData>();
  const { fields, append, insert, remove } = useFieldArray({
    name: `additionalInfo.achievements`
  })

  const { activeSection, setActiveSection } = useActiveSectionContext();
  const section = 'achievements-section';
  const { template } = useCVTemplateContext();

  const handleAddAchievement = () => {
    append({
      name: "",
      description: "",
    });
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>, respIndex: number) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        insert(respIndex + 1, {
          name: "",
          description: "",
        });
        setTimeout(() => {
          const nextTextareaId = `achievement-${respIndex + 1}`;
          const nextTextarea = document.getElementById(nextTextareaId) as HTMLTextAreaElement | null;
          nextTextarea?.focus();
        }, 0);
      } else if (e.key === 'Backspace' && !e.currentTarget.value) {
        if (fields.length > 1) {
          e.preventDefault();
          remove(respIndex);
          setTimeout(() => {
            const prevTextareaId = `achievement-${respIndex - 1}`;
            const prevTextarea = document.getElementById(prevTextareaId) as HTMLTextAreaElement | null;
            prevTextarea?.focus();
          }, 0);
        }
      }
    },
    [fields.length, insert, remove]
  );

  return fields.length ? (
    <div className={template.additional.container}>
      <h2 className={template.additional.h3}>
        Achievements
      </h2>

      <div 
        data-section={section}
        className={cn(
          'entry-border',
          section === activeSection ? 'entry-active' : 'border-transparent'
        )}
        onClick={(e) => {
          e.stopPropagation();
          setActiveSection(section);
        }}
      >
        <ul className={template.additional.compactList}>
          {section === activeSection && (
            <EntryOperator
              itemsLength={fields.length+1}
              onAdd={handleAddAchievement}
              onRemove={() => {
                remove(fields.length - 1);
              }}
            />
          )}
          {fields.map((exp, index) => {
            return (
              <li
                key={exp.id}
                className={template.additional.listItem}
              >
                <div className="flex items-start">
                  <TextareaAutosize
                     id={`achievement-${index}`}
                    {...register(`additionalInfo.achievements.${index}.name`)}
                    minRows={1}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    placeholder="Award or Recognition or Scholarship or Honor"
                    className="w-full mt-0.5 align-top grow leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  ) : null;
}

const CertificationsNestedFieldArray: FC = (): ReactElement => {
  const { register } = useFormContext<FormData>();
  const { fields, append, insert, remove } = useFieldArray({
    name: `additionalInfo.certifications`
  })

  const { activeSection, setActiveSection } = useActiveSectionContext();
  const section = 'certifications-section';
  const { template } = useCVTemplateContext();

  const handleAddCertification = () => {
    append({
      name: "",
      description: "",
    });
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>, respIndex: number) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        insert(respIndex + 1, {
          name: "",
          description: "",
        });
        setTimeout(() => {
          const nextTextareaId = `certification-${respIndex + 1}`;
          const nextTextarea = document.getElementById(nextTextareaId) as HTMLTextAreaElement | null;
          nextTextarea?.focus();
        }, 0);
      } else if (e.key === 'Backspace' && !e.currentTarget.value) {
        if (fields.length > 1) {
          e.preventDefault();
          remove(respIndex);
          setTimeout(() => {
            const prevTextareaId = `certification-${respIndex - 1}`;
            const prevTextarea = document.getElementById(prevTextareaId) as HTMLTextAreaElement | null;
            prevTextarea?.focus();
          }, 0);
        }
      }
    },
    [fields.length, insert, remove]
  );

  return fields.length ? (
    <div className={template.additional.container}>
      <h2 className={template.additional.h3}>
        Certifications
      </h2>

      <div 
        data-section={section}
        className={cn(
          'entry-border',
          section === activeSection ? 'entry-active' : 'border-transparent'
        )}
        onClick={(e) => {
          e.stopPropagation();
          setActiveSection(section);
        }}
      >
        <ul className={template.additional.compactList}>
          {section === activeSection && (
            <EntryOperator
              itemsLength={fields.length+1}
              onAdd={handleAddCertification}
              onRemove={() => {
                remove(fields.length - 1);
              }}
            />
          )}
          {fields.map((exp, index) => {
            return (
              <li
                key={exp.id}
                className={template.additional.listItem}
              >
                <div className='flex items-start'>
                  <TextareaAutosize
                     id={`certification-${index}`}
                    {...register(`additionalInfo.certifications.${index}.name`)}
                    minRows={1}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    placeholder="Certification Name"
                    className="w-full mt-0.5 align-top grow leading-none resize-none overflow-y-hidden outline-none bg-transparent hyphens-auto"
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  ) : null;
}

export const ResumeAdditional: FC = () => {
  const { template } = useCVTemplateContext();

  return <>
    <ProjectsNestedFieldArray />

    <div className={cn('order-4', template.additional.container)} id="skills-section">
      <h2 className={template.additional.h2}>
        Technical Skills & Certifications
      </h2>

      <AchievementsNestedFieldArray />

      <CertificationsNestedFieldArray />

      <LanguageNestedFieldArray />
    </div>
  </>
};