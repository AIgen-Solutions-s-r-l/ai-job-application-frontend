import React from 'react';
import { Resume } from '../trash/application.types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { NullifiedInput } from '@/components/ui/nullified-input';
import { ArrowRight, Minus, Plus } from 'lucide-react';

type FormData = Pick<Resume, "educationDetails">

export const ResumeEducation: React.FC = () => {
  const { control, register } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ control, name: "educationDetails" });
  
  const addEducation = () =>
    append({
      education_level: "",
      institution: "",
      field_of_study: "",
      final_evaluation_grade: "",
      year_of_completion: "",
      start_date: "",
    }
  );
  
  return (
    <div className="mt-8 relative" id="education-section">
      {!!fields.length && (
        <h1 className="text-xs font-semibold tracking-wide w-full border-b-4 border-black pb-2 uppercase">
          Education
        </h1>
      )}
      {fields.map((exp, index) => {
        return (
          <div
            key={exp.id}
            className="flex flex-row justify-between items-start pt-2 relative"
          >
            <div className="absolute top-2 -left-6 w-8 h-8 items-center gap-10 group">
              {<button 
                className={fields.length === 1 ? 'hidden' : 'hidden group-hover:flex'}
                onClick={() => remove(index)}
              >
                <Minus className='font-bold text-base-content' size={16} strokeWidth={3}  />
              </button>}
            </div>
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
        );
      })}

      <div className="absolute -bottom-10 -left-6 w-8 h-8 items-center gap-10 group">
        {<button 
          className='hidden group-hover:flex'
          onClick={addEducation}
        >
          <Plus className='font-bold text-base-content' size={16} strokeWidth={3}  />
        </button>}
      </div>
    </div>
  );
};