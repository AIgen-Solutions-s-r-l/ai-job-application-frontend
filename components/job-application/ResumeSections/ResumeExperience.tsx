import React, { useEffect, useState } from 'react';
import { Resume } from '../trash/application.types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { NullifiedInput } from '@/components/ui/nullified-input';
import { Minus, Plus } from 'lucide-react';

type FormData = Pick<Resume, "experienceDetails">

const ResponsibilityNestedFieldArray: React.FC<{ index: number; }> = ({
  index,
}: {
  index: number;
}): React.ReactElement => {
  const { register, getValues } = useFormContext<FormData>();
  const [editing, setEditing] = useState(null);
  const { fields, append, remove } = useFieldArray({ 
    name: `experienceDetails.${index}.key_responsibilities`
  })

  const respies: string[] = getValues(`experienceDetails.${index}.key_responsibilities`);

  useEffect(() => {
    if (fields.length === 0) {
      append("");
    }
  }, []);

  return (
    <ul className='list-disc list-inside text-xs ml-4 pt-1 relative'>
      {fields.map((responsibility, respIndex) => (
        <li key={responsibility.id} className='relative' onClick={() => setEditing(true)}>
          <div className="absolute top-0 -left-2 w-8 h-8 items-center gap-10 group">
            {<button 
              className={fields.length === 1 ? 'hidden' : 'hidden group-hover:flex'}
              onClick={() => remove(respIndex)}
            >
              <Minus className='font-bold text-base-content' size={16} strokeWidth={4}  />
            </button>}
          </div>
          {/* <NullifiedInput
            {...register(`experienceDetails.${index}.key_responsibilities.${respIndex}`)}
            placeholder="Responsibility"
          /> */}
          {editing ? (
              // <textarea
              //   {...register(`experienceDetails.${index}.key_responsibilities.${respIndex}`)}
              //   placeholder="Responsibility"
              //   rows={1}
              //   className='w-[95%] resize-none border-b-2 border-transparent outline-none bg-transparent focus:outline-secondary placeholder-shown:border-black'
              // />
              <NullifiedInput
                {...register(`experienceDetails.${index}.key_responsibilities.${respIndex}`)}
                placeholder="Responsibility"
                className='min-w-[600px] max-w-[90%]'
              />
            ) : respies[respIndex]
          }
        </li>
      ))}
      <div className="absolute -bottom-8 -left-2 w-8 h-8 items-center gap-10 group">
        {<button 
          className='hidden group-hover:flex'
          onClick={() => append("")}
        >
          <Plus className='font-bold text-base-content' size={16} strokeWidth={3}  />
        </button>}
      </div>
    </ul>
  )
}

export const ResumeExperience: React.FC = () => {
  const { control, register } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ control, name: "experienceDetails" });
  
  const handleAddExperience = () =>
    append({
      position: "",
      company: "",
      employment_period: "",
      location: "",
      industry: "",
      key_responsibilities: [],
      skills_acquired: [],
    }
  );
  
  return (
    <div className="mt-8 relative" id="education-section">
      {!!fields.length && (
        <h1 className="text-xs font-semibold tracking-wide w-full border-b-4 border-black pb-2 uppercase">
          Experience
        </h1>
      )}
      {fields.map((exp, index) => {
        return (
          <div
            key={index}
            className="flex flex-col relative mb-2"
          >
            <div className="absolute top-2 -left-6 w-8 h-8 items-center gap-10 group">
              {<button 
                className={fields.length === 1 ? 'hidden' : 'hidden group-hover:flex'}
                onClick={() => remove(index)}
              >
                <Minus className='font-bold text-base-content' size={16} strokeWidth={3}  />
              </button>}
            </div>
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
        );
      })}

      <div className="absolute -bottom-10 -left-6 w-8 h-8 items-center gap-10 group">
        {<button 
          className='hidden group-hover:flex'
          onClick={handleAddExperience}
        >
          <Plus className='font-bold text-base-content' size={16} strokeWidth={3}  />
        </button>}
      </div>
    </div>
  );
};