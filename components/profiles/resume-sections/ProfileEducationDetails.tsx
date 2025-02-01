import { FormInput, InputWrapper } from '@/components/ui/form-input';
import { JobProfile } from '@/libs/definitions';
import { ArrowRight, Plus } from 'lucide-react';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

type FormData = Pick<JobProfile, "educationDetails">

export const ProfileEducationDetails: React.FC = () => {
  const { control, register, formState: { errors } } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ control, name: "educationDetails", rules: { required: 'At least one education is required' } });

  const addEducation = () =>
    append({
      education_level: "",
      institution: "",
      field_of_study: "",
      final_evaluation_grade: "",
      year_of_completion: "",
      start_date: "",
    });

  return (
    <div className="collapse collapse-arrow bg-base-200 group rounded-none">
      <input type="checkbox" name="my-accordion-2" />
      <div className="collapse-title text-xl font-medium bg-white group-has-[input:checked]:bg-white">Education Details
        {errors.educationDetails && <p className="text-error text-xs">Please fill out all required fields</p>}
      </div>
      <div className="collapse-content bg-white">
        {fields.map((education, index) => (
          <div key={education.id} className="flex flex-col gap-5 mt-5">
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

            {/* Institution */}
            <InputWrapper>
              <FormInput
                title={'Education Level'}
                {...register(`educationDetails.${index}.education_level`, { required: 'Education level is required' })}
                placeholder="e.g., Bachelor's Degree"
                error={!!errors.educationDetails?.[index]?.education_level}
                errorMessage={errors.educationDetails?.[index]?.education_level?.message}
                className='w-[242px]'
              />
              <FormInput
                title={'Institution'}
                {...register(`educationDetails.${index}.institution`, { required: 'Institution is required' })}
                placeholder="e.g., Harvard University"
                error={!!errors.educationDetails?.[index]?.institution}
                errorMessage={errors.educationDetails?.[index]?.institution?.message}
                className='grow'
              />
              <FormInput
                title={'Field of Study'}
                {...register(`educationDetails.${index}.field_of_study`, { required: 'Field of Study is required' })}
                placeholder="e.g., Computer Science"
                error={!!errors.educationDetails?.[index]?.field_of_study}
                errorMessage={errors.educationDetails?.[index]?.field_of_study?.message}
                className='w-[429px]'
              />
            </InputWrapper>

            {/* Dates */}
            <InputWrapper>
              <FormInput
                title={'Start Date'}
                {...register(`educationDetails.${index}.start_date`, { required: 'Start Date is required' })}
                placeholder="e.g., 2015"
                error={!!errors.educationDetails?.[index]?.start_date}
                errorMessage={errors.educationDetails?.[index]?.start_date?.message}
                className='w-[160px]'
              />
              <FormInput
                title={'Completion Date'}
                {...register(`educationDetails.${index}.year_of_completion`, { required: 'Completion Date is required' })}
                placeholder="e.g., 2019"
                error={!!errors.educationDetails?.[index]?.year_of_completion}
                errorMessage={errors.educationDetails?.[index]?.year_of_completion?.message}
                className='w-[160px]'
              />
              <FormInput
                title={'Grade'}
                {...register(`educationDetails.${index}.final_evaluation_grade`, { required: 'Graduation Grade is required' })}
                placeholder="e.g., 3.8/4.0"
                error={!!errors.educationDetails?.[index]?.final_evaluation_grade}
                errorMessage={errors.educationDetails?.[index]?.final_evaluation_grade?.message}
                className='w-[149px]'
              />
            </InputWrapper>
          </div>
        ))}

        <div className="flex items-center gap-4 my-5">
          <div
            className="w-[240px] h-[50px] rounded-[20px] flex items-center justify-between px-[15px] bg-neutral hover:bg-secondary group transition-all ease-in duration-100"
            onClick={addEducation}
          >
            <p className='text-lg text-base-100'>Add Education</p>
            <Plus className='font-bold text-secondary group-hover:text-base-100' size={32} strokeWidth={3} />
          </div>
        </div>
      </div>
    </div>
  );
};