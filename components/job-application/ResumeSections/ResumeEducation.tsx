import React from 'react';
import { Resume } from '../trash/application.types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { NullifiedInput } from '@/components/ui/nullified-input';
import { useNestedClickOutside } from '@/libs/hooks/useClickOutside';
import { cn } from '@/lib/utils';
import { EntryOperator } from './EntryOperator';

type FormData = Pick<Resume, "educationDetails">

export const ResumeEducation: React.FC = () => {
  const { control, register } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ control, name: "educationDetails" });
  const { setRef, activeIndex, setActiveIndex } = useNestedClickOutside<number>();
  
  const handleAddEducation = () => {
    const newIndex = fields.length;
    append({
      education_level: "",
      institution: "",
      field_of_study: "",
      final_evaluation_grade: "",
      year_of_completion: "",
      start_date: "",
    });
    setActiveIndex(newIndex);
  };
  
  return (
    <div className="mt-8" id="education-section">
      {!!fields.length && (
        <h1 className="text-xs font-semibold tracking-wide w-full border-b-4 border-black pb-2 uppercase">
          Education
        </h1>
      )}
      {activeIndex  !== null && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}
      {fields.map((exp, index) => (
        <div
          key={exp.id}
          ref={(element) => setRef(index, element as HTMLDivElement)}
          className={cn(
            'flex flex-row justify-between items-start relative border-2 border-transparent pt-2 hover:border-secondary has-[:focus]:border-secondary bg-white', 
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
              onAdd={handleAddEducation}
              onRemove={() => {
                remove(index);
                setActiveIndex(null);
              }}
            />
          )}
          <div className="flex flex-col w-[70%]">
            <span className="text-xs font-semibold">
              <NullifiedInput
                {...register(`educationDetails.${index}.institution`)}
                placeholder="Institution"
                className="min-w-[200px]"
              />
            </span>
            <span className="text-xs italic">
              <NullifiedInput
                {...register(`educationDetails.${index}.education_level`)}
                placeholder="Education Level"
                className="min-w-2"
              />
              &nbsp;in&nbsp;
              <NullifiedInput
                {...register(`educationDetails.${index}.field_of_study`)}
                placeholder="Field of Study"
              />
              &nbsp;|&nbsp;Grade:&nbsp;
              <NullifiedInput
                {...register(`educationDetails.${index}.final_evaluation_grade`)}
                placeholder="Grade"
                className="min-w-2"
              />
              /4
            </span>
          </div>
          <div className="flex flex-col items-end w-[30%] text-gray-700 text-base">
            <span className="text-xs">
              <NullifiedInput
                {...register(`educationDetails.${index}.start_date`)}
                placeholder="Start Date"
                className="min-w-2"
              />
            </span>
            <span className="text-xs">
              <NullifiedInput
                {...register(`educationDetails.${index}.year_of_completion`)}
                placeholder="End Date"
                className="min-w-2"
              />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};