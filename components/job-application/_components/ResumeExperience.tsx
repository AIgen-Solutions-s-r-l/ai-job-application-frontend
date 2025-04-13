import { FC, ReactElement, useCallback, useEffect, KeyboardEvent } from 'react';
import { Resume } from '../../../libs/types/application.types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { NullifiedInput } from '@/components/ui/nullified-input';
import TextareaAutosize from 'react-textarea-autosize';
import { cn } from '@/lib/utils';
import { EntryOperator } from './EntryOperator';
import { useActiveSectionContext } from '../../../contexts/active-section-context';
import { useCVTemplateContext } from '../../../contexts/cv-template-context';

type FormData = Pick<Resume, "experienceDetails">

const ResponsibilityNestedFieldArray: FC<{ index: number; }> = ({
  index,
}: {
  index: number;
}): ReactElement => {
  const { register } = useFormContext<FormData>();
  const { fields, append, insert, remove } = useFieldArray({
    name: `experienceDetails.${index}.key_responsibilities`
  })
  const { template } = useCVTemplateContext();

  useEffect(() => {
    if (fields.length === 0) {
      append("");
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>, respIndex: number) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        insert(respIndex + 1, "");
        setTimeout(() => {
          const nextTextareaId = `responsibility-${index}-${respIndex + 1}`;
          const nextTextarea = document.getElementById(nextTextareaId) as HTMLTextAreaElement | null;
          nextTextarea?.focus();
        }, 0);
      } else if (e.key === 'Backspace' && !e.currentTarget.value) {
        if (fields.length > 1) {
          e.preventDefault();
          remove(respIndex);
          setTimeout(() => {
            const prevTextareaId = `responsibility-${index}-${respIndex - 1}`;
            const prevTextarea = document.getElementById(prevTextareaId) as HTMLTextAreaElement | null;
            prevTextarea?.focus();
          }, 0);
        }
      }
    },
    [fields.length, insert, remove, index]
  );

  return (
    <ul className={cn('relative', template.experience.compactList)}>
      {fields.map((responsibility, respIndex) => (
        <li key={responsibility.id} className={template.experience.listItem}>
          <TextareaAutosize
            id={`responsibility-${index}-${respIndex}`}
            {...register(`experienceDetails.${index}.key_responsibilities.${respIndex}`)}
            minRows={1}
            onKeyDown={(e) => handleKeyDown(e, respIndex)}
            placeholder="Highlight your accomplishments, using numbers if possible."
            className="w-[95%] inline-block align-top resize-none outline-none bg-transparent"
          />
        </li>
      ))}
    </ul>
  )
}

export const ResumeExperience: FC = () => {
  const { control, register } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ control, name: "experienceDetails" });
  const { activeSection, setActiveSection } = useActiveSectionContext();
  const section = 'experience-section';
  const { template } = useCVTemplateContext();

  const handleAddExperience = () => {
    const newIndex = fields.length;
    append({
      position: "",
      company: "",
      employment_start_date: "",
      employment_end_date: "",
      location: {
        country: "",
        city: "",
      },
      industry: "",
      key_responsibilities: [],
      skills_acquired: [],
    });
    setActiveSection(`${section}-${newIndex}`);
  }

  return (
    <div className={template.experience.container} id="experience-section">
      {!!fields.length && (
        <h2 className={template.experience.h2}>
          Professional Experience
        </h2>
      )}
      {fields.map((exp, index) => {
        const activeIndex = `${section}-${index}`

        return (
          <div
            key={exp.id}
            data-section={activeIndex}
            className={cn(
              template.experience.entry,
              'relative border-2 hover:border-primary',
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
                onAdd={handleAddExperience}
                onRemove={() => {
                  remove(index);
                  setActiveSection(null);
                }}
              />
            )}
            <div className={template.experience.entryHeader}>
              <span className={template.experience.entryName}>
                <NullifiedInput
                  {...register(`experienceDetails.${index}.company`)}
                  placeholder="Company"
                />
              </span>
              <span className={template.experience.entryLocation}>
                <NullifiedInput
                  {...register(`experienceDetails.${index}.location.city`)}
                  placeholder="City"
                />
                ,&nbsp;
                <NullifiedInput
                  {...register(`experienceDetails.${index}.location.country`)}
                  placeholder="Country"
                />
              </span>
            </div>
            <div className={template.experience.entryDetails}>
              <span className={template.experience.entryTitle}>
                <NullifiedInput
                  {...register(`experienceDetails.${index}.position`)}
                  placeholder="Position"
                />
              </span>
              <span className={template.experience.entryYear}>
                <NullifiedInput
                  {...register(`experienceDetails.${index}.employment_start_date`)}
                  placeholder="Start Date"
                />
                &nbsp; - &nbsp;
                <NullifiedInput
                  {...register(`experienceDetails.${index}.employment_end_date`)}
                  placeholder="End Date"
                />
              </span>
            </div>

            <ResponsibilityNestedFieldArray index={index} />
          </div>
        )
      })}
    </div>
  );
};