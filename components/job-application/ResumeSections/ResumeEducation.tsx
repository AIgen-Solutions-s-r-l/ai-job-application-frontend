import React from 'react';
import { Resume } from '../trash/application.types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { NullifiedInput } from '@/components/ui/nullified-input';
import { cn } from '@/lib/utils';
import { EntryOperator } from './EntryOperator';
import { useActiveSectionContext } from './active-section-context';

type FormData = Pick<Resume, "educationDetails">

export const ResumeEducation: React.FC = () => {
  const { control, register } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ control, name: "educationDetails" });
  const { activeSection, setActiveSection } = useActiveSectionContext();
  const section = 'education-section';

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
    setActiveSection(`${section}-${newIndex}`);
  };
  
  return (
    <div className="mt-8" id="education-section">
      {!!fields.length && (
        <h1 className="text-xs font-semibold tracking-wide w-full border-b-4 border-black pb-2 uppercase">
          Education
        </h1>
      )}
      {fields.map((exp, index) => {
        const activeIndex = `${section}-${index}`
        
        return (
          <div
            key={exp.id}
            data-section={activeIndex}
            className={cn(
              'flex flex-row justify-between items-start relative border-2 pt-2 hover:border-secondary', 
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
                onAdd={handleAddEducation}
                onRemove={() => {
                  remove(index);
                  setActiveSection(null);
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
        )
      })}
    </div>
  );
};