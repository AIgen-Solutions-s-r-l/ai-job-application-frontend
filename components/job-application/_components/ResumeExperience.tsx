import React, { useCallback, useEffect } from 'react';
import { Resume } from '../../../libs/types/application.types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { NullifiedInput } from '@/components/ui/nullified-input';
import TextareaAutosize from 'react-textarea-autosize';
import { cn } from '@/lib/utils';
import { EntryOperator } from './EntryOperator';
import { useActiveSectionContext } from '../../../contexts/active-section-context';

type FormData = Pick<Resume, "experienceDetails">

const ResponsibilityNestedFieldArray: React.FC<{ index: number; }> = ({
  index,
}: {
  index: number;
}): React.ReactElement => {
  const { register } = useFormContext<FormData>();
  const { fields, append, insert, remove } = useFieldArray({ 
    name: `experienceDetails.${index}.key_responsibilities`
  })

  useEffect(() => {
    if (fields.length === 0) {
      append("");
    }
  }, []);
  
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>, respIndex: number) => {
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
    <ul className='list-disc relative text-xs flex flex-col gap-[5px] my-[5px] mx-[30px]'>
      {fields.map((responsibility, respIndex) => (
        <li key={responsibility.id}>
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

export const ResumeExperience: React.FC = () => {
  const { control, register } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ control, name: "experienceDetails" });
  const { activeSection, setActiveSection } = useActiveSectionContext();
  const section = 'experience-section';
  
  const handleAddExperience = () => {
    const newIndex = fields.length;
    append({
      position: "",
      company: "",
      employment_period: "",
      location: "",
      industry: "",
      key_responsibilities: [],
      skills_acquired: [],
    });
    setActiveSection(`${section}-${newIndex}`);
  }
  
  return (
    <div className="" id="experience-section">
      {!!fields.length && (
        <h2 className="text-2xl font-bold border-b border-solid border-black">
          Experience
        </h2>
      )}
      {fields.map((exp, index) => {
        const activeIndex = `${section}-${index}`

        return (
          <div
            key={exp.id}
            data-section={activeIndex}
            className={cn(
              'flex flex-col gap-[5px] p-[10px] -mx-[10px] relative border-2 hover:border-secondary', 
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
                onAdd={handleAddExperience}
                onRemove={() => {
                  remove(index);
                  setActiveSection(null);
                }}
              />
            )}
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold">
                <NullifiedInput
                  {...register(`experienceDetails.${index}.company`)}
                  placeholder="Company"
                />
              </span>
              <span className="text-xs">
                <NullifiedInput
                  {...register(`experienceDetails.${index}.location`)}
                  placeholder="Location"
                />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs italic">
                <NullifiedInput
                  {...register(`experienceDetails.${index}.position`)}
                  placeholder="Position"
                />
              </span>
              <span className="text-xs">
                <NullifiedInput
                  {...register(`experienceDetails.${index}.employment_period`)}
                  placeholder="Employment period"
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