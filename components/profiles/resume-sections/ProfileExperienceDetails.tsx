'use client';

import React, { FC, ReactElement, useCallback, useEffect } from "react";
import { JobProfile } from "@/libs/definitions";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ArrowRight, Plus } from "lucide-react";
import { FormInput, InputWrapper } from "@/components/ui/form-input";

type FormData = Pick<JobProfile, "experienceDetails">

const ResponsibilityNestedFieldArray: FC<{ index: number; }> = ({
  index,
}: {
  index: number;
}): ReactElement => {
  const { register, formState: { errors } } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    name: `experienceDetails.${index}.key_responsibilities`
  })

  useEffect(() => {
    if (fields.length === 0) {
      append("");
    }
  }, []);

  return (
    <>
      {fields.map((responsibility, respIndex) => (
        <div key={responsibility.id} className="flex items-center gap-2 mb-2 bg-white">
          <button
            type="button"
            disabled={fields.length === 1}
            className="remove-nested"
            onClick={() => remove(respIndex)}
          >
            <span className="text-base">−</span>
          </button>
          <input
            {...register(`experienceDetails.${index}.key_responsibilities.${respIndex}`, {
              required: fields.length === 1 ? 'Responsibilities are required' : undefined
            })}
            placeholder="e.g., Led a team of developers to build scalable applications"
            className={
              `my-input
              ${errors.experienceDetails?.[index]?.key_responsibilities?.[respIndex] && "placeholder-shown:border-error"}`
            }
          />
        </div>
      ))}
      {fields.length === 1 && errors.experienceDetails?.[index]?.key_responsibilities?.[0] && <p className="text-error mt-[2px] text-xs">At least one responsibility is required</p>}
      <button
        type="button"
        className="add-nested"
        onClick={() => append("")}
      >
        <span className="text-2xl">+</span> 
        <p className="text-base">Add Responsibility</p>
      </button>
    </>
  )
}

const SkillsNestedFieldArray: FC<{ index: number; }> = ({
  index,
}: {
  index: number;
}): ReactElement => {
  const { getValues, setValue } = useFormContext<FormData>();
  const skills: string[] = getValues(`experienceDetails.${index}.skills_acquired`);

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeout: ReturnType<typeof setTimeout> | undefined; // Correct type
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const handleSkillsChange = useCallback(
    (index: number, value: string) => {
      const skillsArray = value.split(',').map(skill => skill.trim()).filter(Boolean);
      setValue(`experienceDetails.${index}.skills_acquired`, skillsArray);
    },
    [setValue]
  );

  const debouncedHandleSkillsChange = useCallback(
    debounce(handleSkillsChange, 500),
    [handleSkillsChange]
  );

  return (
    <div className="flex p-10 rounded-[22px] bg-white">
      <div className="w-full">
        <label className="flex justify-start text-[14px] md:text-base leading-none mb-3 font-semibold">
          Skills
        </label>
        <textarea
          onChange={(e) => debouncedHandleSkillsChange(index, e.target.value)} // Use the debounced function
          defaultValue={skills ? skills.join(', ') : ''}
          placeholder="e.g., React, TypeScript, Node.js, Git (separate skills with commas)"
          className="w-full bg-white outline-none border border-my-neutral-4 focus:border-primary-light-purple placeholder-shown:border-my-neutral-4 placeholder:text-base h-20 px-[10px] pt-3 rounded-md text-[18px] font-jura"
        />
      </div>
    </div>
  )
}

export const ProfileExperienceDetails: FC = (): ReactElement => {
  const { control, register, formState: { errors } } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control, name: "experienceDetails", rules: {
      required: 'At least one experience is required',
    }
  });

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
    <div className="collapse collapse-arrow group rounded-none">
      <input type="checkbox" name="my-accordion-2" />
      <div className="collapse-title !pl-5 text-base md:text-lg lg:text-xl font-montserrat font-medium bg-my-neutral-2 group-has-[input:checked]:bg-base-100">Experience Details
        {errors.experienceDetails && <p className="text-error text-xs">Please fill out all required fields</p>}
      </div>
      <div className="collapse-content !p-0 bg-base-100">
        {fields.map((experience, index) => (
          <div key={experience.id} className="flex flex-col gap-5 mt-5">
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-2">
                <ArrowRight size={24} />
                <p className='text-2xl font-bold leading-none'>{index + 1}</p>
              </div>
              {<button
                className={`upderline ${fields.length === 1 && 'hidden'}`}
                onClick={() => remove(index)}
              >
                <p className='underline text-base leading-none'>Remove</p>
              </button>}
            </div>
  
            <InputWrapper>
              <FormInput
                title={'Company'}
                {...register(`experienceDetails.${index}.company`, { required: 'Education level is required' })}
                placeholder="e.g., Google"
                error={!!errors.experienceDetails?.[index]?.company}
                errorMessage={errors.experienceDetails?.[index]?.company?.message}
                className='w-[194px]'
              />
              <FormInput
                title={'Position'}
                {...register(`experienceDetails.${index}.position`, { required: 'Position is required' })}
                placeholder="e.g., Software Engineer"
                error={!!errors.experienceDetails?.[index]?.position}
                errorMessage={errors.experienceDetails?.[index]?.position?.message}
                className='grow'
              />
              <FormInput
                title={'Employment Period'}
                {...register(`experienceDetails.${index}.employment_period`, { required: 'Employment Period is required' })}
                placeholder="e.g., June 2020 - Present"
                error={!!errors.experienceDetails?.[index]?.employment_period}
                errorMessage={errors.experienceDetails?.[index]?.employment_period?.message}
                className='w-[238px]'
              />
              <FormInput
                title={'Location'}
                {...register(`experienceDetails.${index}.location`, { required: 'Location is required' })}
                placeholder="e.g., San Francisco, CA"
                error={!!errors.experienceDetails?.[index]?.location}
                errorMessage={errors.experienceDetails?.[index]?.location?.message}
                className='w-[164px]'
              />
              <FormInput
                title={'Industry'}
                {...register(`experienceDetails.${index}.industry`)}
                required={false}
                placeholder="e.g., Tech"
                // error={!!errors.experienceDetails?.[index]?.industry}
                // errorMessage={errors.experienceDetails?.[index]?.industry?.message}
                className='w-[164px]'
              />
            </InputWrapper>
  
            <div className="flex p-10 rounded-[22px] bg-white">
              <div className="w-full">
                <label className="flex justify-start text-[14px] md:text-base leading-none mb-3 font-semibold">
                  Key Responsibilities <span className="text-error ml-1">*</span>
                </label>
                <ResponsibilityNestedFieldArray index={index} />
              </div>
            </div>
  
            <SkillsNestedFieldArray index={index} />
          </div>
        ))}
  
        <div className="flex items-center gap-4 my-5">
          <div
            className="w-[240px] h-[50px] font-jura hover:text-white text-black rounded-[20px] flex items-center justify-between pl-[25px] pr-[20px] bg-white cursor-pointer hover:bg-my-neutral-5 group transition-all ease-in duration-100"
            onClick={handleAddExperience}
          >
            <p className='text-lg font-semibold'>Add Experience</p>
            <Plus className='font-bold text-black group-hover:text-white' size={32} strokeWidth={3} />
          </div>
        </div>
      </div>
    </div>
  );
};

