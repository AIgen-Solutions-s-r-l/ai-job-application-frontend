import React, { useCallback, useEffect } from 'react';
import { Resume } from '../trash/application.types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { NullifiedInput } from '@/components/ui/nullified-input';
import { useNestedClickOutside } from '@/libs/hooks/useClickOutside';
import TextareaAutosize from 'react-textarea-autosize';
import { cn } from '@/lib/utils';
import { EntryOperator } from './EntryOperator';

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

  const { activeIndex, setActiveIndex } = useNestedClickOutside<number>();

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
        setActiveIndex(respIndex + 1);
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
    <ul className='list-disc list-inside text-xs ml-4 pt-1 relative'>
      {fields.map((responsibility, respIndex) => (
        <li key={responsibility.id}>
          <TextareaAutosize
            {...register(`experienceDetails.${index}.key_responsibilities.${respIndex}`)}
            minRows={1}
            onKeyDown={(e) => handleKeyDown(e, respIndex)}
            id={`responsibility-${index}-${respIndex}`}
            autoFocus={activeIndex === respIndex}
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
  const { setRef, activeIndex, setActiveIndex } = useNestedClickOutside<number>();
  
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
    setActiveIndex(newIndex);
  }
  
  return (
    <div className="mt-8" id="education-section">
      {!!fields.length && (
        <h1 className="text-xs font-semibold tracking-wide w-full border-b-4 border-black pb-2 uppercase">
          Experience
        </h1>
      )}
      {activeIndex !== null && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}
      {fields.map((exp, index) => (
        <div
          key={exp.id}
          ref={(element) => setRef(index, element)}
          className={cn(
            'flex flex-col relative mb-2 border-2 border-transparent hover:border-secondary has-[:focus]:border-secondary bg-white', 
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
              onAdd={handleAddExperience}
              onRemove={() => {
                remove(index);
                setActiveIndex(null);
              }}
            />
          )}
          <div className="flex flex-row justify-between items-start pt-2">
            <div className="flex flex-col w-[70%]">
              <span className="text-xs font-semibold">
                <NullifiedInput
                  {...register(`experienceDetails.${index}.company`)}
                  placeholder="Company"
                />
              </span>
              <span className="text-xs italic">
                <NullifiedInput
                  {...register(`experienceDetails.${index}.position`)}
                  placeholder="Position"
                />
              </span>
            </div>
            <div className="flex flex-col items-end w-[30%] text-gray-700 text-base">
              <span className="text-xs">
                <NullifiedInput
                  {...register(`experienceDetails.${index}.location`)}
                  placeholder="Location"
                />
              </span>
              <span className="text-xs">
                <NullifiedInput
                  {...register(`experienceDetails.${index}.employment_period`)}
                  placeholder="Employment period"
                />
              </span>
              <span></span>
            </div>
          </div>

          <ResponsibilityNestedFieldArray index={index} />
        </div>
      ))}
    </div>
  );
};