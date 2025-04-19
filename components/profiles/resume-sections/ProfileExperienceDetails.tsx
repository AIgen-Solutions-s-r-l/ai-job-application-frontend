'use client';

import React, { FC, ReactElement, useCallback, useEffect } from "react";
import { JobProfile } from "@/libs/definitions";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { ArrowRight, Plus } from "lucide-react";
import { FormInput, InputWrapper } from "@/components/ui/form-input";
import { DateOrPresentInput } from "@/components/ui/date-input";

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
  }, [append, fields.length]);

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
      {fields.length === 1 && errors.experienceDetails?.[index]?.key_responsibilities?.[0] && <p className="text-error mt-[2px] text-xs lg:text-sm">At least one responsibility is required</p>}
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

  // eslint-disable-next-line no-unused-vars
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

const ExperienceDetail: FC<{ index: number, handleRemove: () => void }> = ({ index, handleRemove }) => {
  const { register, formState: { errors }, setValue } = useFormContext<FormData>();
  const { fields } = useFieldArray({ 
    name: `experienceDetails.${index}` 
  });

  return (
    <div className="flex flex-col gap-5 mt-5">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <ArrowRight size={24} />
          <p className='text-2xl font-bold leading-none'>{index + 1}</p>
        </div>
        <button
          type='button'
          className={`upderline ${fields.length === 1 && 'hidden'}`}
          onClick={handleRemove}
        >
          <p className='underline text-base leading-none'>Remove</p>
        </button>
      </div>

      <InputWrapper profile>
        <FormInput
          title={'Company'}
          {...register(`experienceDetails.${index}.company`, { required: 'Company is required' })}
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
          className='grow max-w-[400px]'
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

      <InputWrapper profile>
        <DateOrPresentInput
          title="Start Date"
          value={useWatch({ name: `experienceDetails.${index}.employment_start_date` })}
          onChange={(value) => setValue(`experienceDetails.${index}.employment_start_date`, value)}
          placeholder="e.g., 11/2024"
          error={!!errors.experienceDetails?.[index]?.employment_start_date}
          errorMessage={errors.experienceDetails?.[index]?.employment_start_date?.message}
        />
        <DateOrPresentInput
          title="End Date"
          value={useWatch({ name: `experienceDetails.${index}.employment_end_date` })}
          onChange={(value) => setValue(`experienceDetails.${index}.employment_end_date`, value)}
          placeholder="e.g., Present"
          error={!!errors.experienceDetails?.[index]?.employment_end_date}
          errorMessage={errors.experienceDetails?.[index]?.employment_end_date?.message}
          present
        />
        
        <FormInput
          title={'Country'}
          {...register(`experienceDetails.${index}.location.country`, { required: 'country is required' })}
          placeholder="e.g., Italy"
          error={!!errors.experienceDetails?.[index]?.location?.country}
          errorMessage={errors.experienceDetails?.[index]?.location?.country?.message}
          className='w-[164px]'
        />
        <FormInput
          title={'City'}
          {...register(`experienceDetails.${index}.location.city`, { required: 'City is required' })}
          placeholder="e.g., Milan"
          error={!!errors.experienceDetails?.[index]?.location?.city}
          errorMessage={errors.experienceDetails?.[index]?.location?.city?.message}
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
  );
}

export const ProfileExperienceDetails: FC = (): ReactElement => {
  const { control, formState: { errors } } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control, name: "experienceDetails", rules: {
      required: 'At least one experience is required',
    }
  });

  const handleAddExperience = () => {
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
  }

  return (
    <div className="collapse collapse-arrow group rounded-none">
      <input type="checkbox" name="my-accordion-2" />
      <div className="collapse-title !pl-5 text-base md:text-lg lg:text-xl font-montserrat font-medium bg-my-neutral-2 group-has-[input:checked]:bg-base-100">Experience Details
        {errors.experienceDetails && <p className="text-error text-xs lg:text-sm">Please fill out all required fields</p>}
      </div>
      <div className="collapse-content !p-0 bg-base-100">
        {fields.map((experience, index) => (
          <ExperienceDetail 
            key={experience.id} 
            index={index} 
            handleRemove={() => remove(index)} 
          />
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

