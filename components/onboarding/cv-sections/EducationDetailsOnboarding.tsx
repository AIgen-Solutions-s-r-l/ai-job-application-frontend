import { FormInput } from '@/components/ui/form-input';
import { JobProfile } from '@/libs/definitions';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

type FormData = Pick<JobProfile, "educationDetails">

export const EducationDetailsOnboarding: React.FC = () => {
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
    <div className="">
      {/* Title */}
      <h5 className='font-semibold text-xl'>Education</h5>

      {errors.educationDetails?.root && <p className="text-error text-xs">{errors.educationDetails.root.message}</p>}
      
      {fields.map((education, index) => (
        <div key={education.id} className="flex flex-col gap-5 my-5">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <ArrowRight size={24} />
              <p className='text-2xl font-bold leading-none'>{index + 1}</p>
            </div>
            <button className='upderline' onClick={() => remove(index)}>
              <p className='underline text-base leading-none'>Remove</p>
            </button>
          </div>
          
          {/* Institution */}
          <div className="flex gap-form">
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
              className='w-[429px]'
            />
            <FormInput
              title={'Field of Study'}
              {...register(`educationDetails.${index}.field_of_study`, { required: 'Field of Study is required' })}
              placeholder="e.g., Computer Science"
              error={!!errors.educationDetails?.[index]?.field_of_study}
              errorMessage={errors.educationDetails?.[index]?.field_of_study?.message}
              className='w-[429px]'
            />
          </div>

          {/* Dates */}
          <div className="flex gap-form">
            <FormInput
              title={'Graduation Grade'}
              {...register(`educationDetails.${index}.final_evaluation_grade`, { required: 'Graduation Grade is required' })}
              placeholder="e.g., 3.8/4.0"
              error={!!errors.educationDetails?.[index]?.final_evaluation_grade}
              errorMessage={errors.educationDetails?.[index]?.final_evaluation_grade?.message}
              className='w-[149px]'
            />
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
          </div>
        </div>
      ))}

      <div className="flex items-center gap-4 mt-3">
        <ArrowRight size={24} />
        <button
          type="button"
          className="bg-white px-[30px] py-3 text-base leading-none text-black rounded-2xl border-2 border-black hover:bg-black hover:text-white"
          onClick={addEducation}
        >
          Add Education
        </button>
      </div>
    </div>
  );
};