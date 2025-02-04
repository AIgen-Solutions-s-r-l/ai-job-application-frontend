import { FormInput, InputWrapper } from '@/components/ui/form-input';
import { JobProfile } from '@/libs/definitions';
import { ArrowRight, Plus } from 'lucide-react';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

type FormData = Pick<JobProfile, "educationDetails">

const ExamNestedFieldArray: React.FC<{ index: number; }> = ({
  index,
}: {
  index: number;
}): React.ReactElement => {
  const { register } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ 
    name: `educationDetails.${index}.exam`
  })

  if (!fields.length) return null;

  return (
    <div className="flex flex-col p-10 rounded-[22px] bg-white">
      <div className="flex gap-2 mb-3">
        <div className="w-10"></div>
        <div className="w-full grid grid-cols-2 gap-form">
          <label className="w-full flex justify-start text-base leading-none font-semibold">
            Exam Subject
          </label>
          <label className="w-full flex justify-start text-base leading-none font-semibold">
            Exam Grade
          </label>
        </div>
      </div>
      {fields.map((responsibility, respIndex) => (
        <div key={responsibility.id} className="flex-col w-full">
          <div className="flex gap-2">
            <button
              type="button"
              disabled={fields.length === 1}
              className="w-10 h-10 flex items-center justify-center bg-my-neutral-2 outline-none border border-base-content hover:bg-base-content text-base-content hover:text-base-100 disabled:cursor-not-allowed rounded-md"
              onClick={() => remove(index)}
            >
              <span className="text-base">−</span>
            </button>
            <div className="w-full grid grid-cols-2 gap-form">
              <div className="w-full">
                <input
                  {...register(`educationDetails.${index}.exam.${respIndex}.subject`)}
                  placeholder="e.g., Certification Name"
                  className="my-input"
                />
              </div>
              <div className="w-full">
                <input
                  {...register(`educationDetails.${index}.exam.${respIndex}.grade`)}
                  placeholder="e.g., Certification Description"
                  className="my-input"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="w-max px-6 h-10 font-jura font-semibold mt-4 bg-my-neutral-2 rounded-md flex items-center justify-center gap-2 text-base-content hover:bg-primary-light-purple transition-all ease-in duration-100 hover:text-white"
        onClick={() => append({ subject: "", grade: "" })}
      >
        <span className="text-2xl">+</span> 
        <p className="text-base">Add Exam</p>
      </button>
    </div>
  )
}

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
      location: "",
      exam: [
        {
          subject: "",
          grade: "",
        }
      ],
    });

  return (
    <div className="">
      {errors.educationDetails?.root && <p className="text-error text-xs">{errors.educationDetails.root.message}</p>}

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
            <FormInput
              title={'Location'}
              {...register(`educationDetails.${index}.location`, { required: 'Location is required' })}
              placeholder="e.g., Italy"
              error={!!errors.educationDetails?.[index]?.location}
              errorMessage={errors.educationDetails?.[index]?.location?.message}
              className='w-[182px]'
            />
          </InputWrapper>

          <ExamNestedFieldArray index={index} />
        </div>
      ))}

      <div className="flex items-center gap-4 my-5">
        <div
          className="w-[240px] h-[50px] font-jura hover:text-white text-black rounded-[20px] flex items-center justify-between pl-[25px] pr-[20px] bg-white cursor-pointer hover:bg-my-neutral-5 group transition-all ease-in duration-100"
          onClick={addEducation}
        >
          <p className='text-lg font-semibold'>Add Education</p>
          <Plus className='font-bold text-black group-hover:text-white' size={32} strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};