import { FormInput, InputWrapper } from '@/components/ui/form-input';
import { JobProfile } from '@/libs/definitions';
import { ArrowRight, Plus } from 'lucide-react';
import { FC, ReactElement } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useEffect } from 'react';

type FormData = Pick<JobProfile, "educationDetails">

const ExamNestedFieldArray: FC<{ index: number; }> = ({
  index,
}: {
  index: number;
}): ReactElement => {
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
          <label className="w-full flex justify-start text-[14px] md:text-base leading-none font-semibold">
            Exam Subject
          </label>
          <label className="w-full flex justify-start text-[14px] md:text-base leading-none font-semibold">
            Exam Grade
          </label>
        </div>
      </div>
      {fields.map((responsibility, respIndex) => (
        <div key={responsibility.id} className="flex-col w-full">
          <div className="flex gap-2 mb-2">
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

export const EducationDetailsOnboarding: FC = () => {
  const { control, register, formState: { errors }, watch, setValue } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ control, name: "educationDetails", rules: { required: 'At least one education is required' } });

  const addEducation = () =>
    append({
      education_level: "",
      institution: "",
      field_of_study: "",
      final_evaluation_grade: "",
      year_of_completion: "",
      start_date: "",
      location: {
        country: "",
        city: "",
      },
      exam: [
        {
          subject: "",
          grade: "",
        }
      ],
      isCurrent: false,
    });

  return (
    <div className="">
      {errors.educationDetails?.root && <p className="text-error text-xs lg:text-sm">{errors.educationDetails.root.message}</p>}

      {fields.map((education, index) => {
        useEffect(() => {
          if (watch(`educationDetails.${index}.isCurrent`)) {
            setValue(`educationDetails.${index}.year_of_completion`, 'Present');
          }
        }, [watch(`educationDetails.${index}.isCurrent`), setValue, index]);

        useEffect(() => {
          if (watch(`educationDetails.${index}.year_of_completion`) === 'Present') {
            setValue(`educationDetails.${index}.isCurrent`, true);
          }
        }, [watch(`educationDetails.${index}.year_of_completion`), watch(`educationDetails.${index}.isCurrent`), setValue, index]);

        return (
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
              {...register(`educationDetails.${index}.education_level`)}
              placeholder="e.g., Bachelor's Degree"
              error={!!errors.educationDetails?.[index]?.education_level}
              errorMessage={errors.educationDetails?.[index]?.education_level?.message}
              className='w-[242px]'
            />
            <FormInput
              title={'Institution'}
              {...register(`educationDetails.${index}.institution`)}
              placeholder="e.g., Harvard University"
              error={!!errors.educationDetails?.[index]?.institution}
              errorMessage={errors.educationDetails?.[index]?.institution?.message}
              className='grow'
            />
            <FormInput
              title={'Field of Study'}
              {...register(`educationDetails.${index}.field_of_study`)}
              placeholder="e.g., Computer Science"
              error={!!errors.educationDetails?.[index]?.field_of_study}
              errorMessage={errors.educationDetails?.[index]?.field_of_study?.message}
              className='grow lg:w-[429px]'
            />
          </InputWrapper>

          <InputWrapper>
            <FormInput
              title={'Start Date'}
              {...register(`educationDetails.${index}.start_date`, { required: 'Start Date is required' })}
              placeholder="e.g., January 2019"
              error={!!errors.educationDetails?.[index]?.start_date}
              errorMessage={errors.educationDetails?.[index]?.start_date?.message}
              className='w-[200px]'
              type="month"
              />
            <div className="flex flex-col w-[200px] gap-1 items-start">
            <FormInput
              title={'End Date'}
              {...register(`educationDetails.${index}.year_of_completion`, {
                validate: value => watch(`educationDetails.${index}.isCurrent`) || !!value || 'End Date is required',
              })}
              placeholder="e.g., December 2019"
              type={useWatch({ name: `educationDetails.${index}.year_of_completion` }) === "Present" ? 'text' : 'month'}
              disabled={watch(`educationDetails.${index}.isCurrent`)}
              error={!!errors.educationDetails?.[index]?.year_of_completion && !watch(`educationDetails.${index}.isCurrent`)}
              errorMessage={errors.educationDetails?.[index]?.year_of_completion?.message}
              className={`w-[200px] ${watch(`educationDetails.${index}.isCurrent`) ? 'text-gray-400' : ''}`}
            />

            <div className="flex items-center gap-3 text-primary font-bold text-md mt-1">
              <input
                type="checkbox"
                id={`isCurrent-${index}`}
                className="scale-125 accent-primary"
                {...register(`educationDetails.${index}.isCurrent` as const)}
                onChange={(e) => {
                const isChecked = e.target.checked;
                setValue(`educationDetails.${index}.isCurrent`, isChecked);
                if (isChecked) {
                  setValue(`educationDetails.${index}.year_of_completion`, "Present");
                } else {
                  setValue(`educationDetails.${index}.year_of_completion`, '');
                }
                }}
              />
              <label htmlFor={`isCurrent-${index}`}>Current</label>
            </div>
            </div>

            <FormInput
              title={'Grade'}
              {...register(`educationDetails.${index}.final_evaluation_grade`)}
              placeholder="e.g., 3.8/4.0"
              error={!!errors.educationDetails?.[index]?.final_evaluation_grade}
              errorMessage={errors.educationDetails?.[index]?.final_evaluation_grade?.message}
              className='w-[149px]'
            />
            <FormInput
              title={'Country'}
              {...register(`educationDetails.${index}.location.country`)}
              placeholder="e.g., Italy"
              error={!!errors.educationDetails?.[index]?.location?.country}
              errorMessage={errors.educationDetails?.[index]?.location?.country?.message}
              className='w-[182px]'
            />
            <FormInput
              title={'City'}
              {...register(`educationDetails.${index}.location.city`)}
              placeholder='e.g., Rome'
              error={!!errors.educationDetails?.[index]?.location?.city}
              errorMessage={errors.educationDetails?.[index]?.location?.city?.message}
              className='w-[182px]'
            />
          </InputWrapper>

          <ExamNestedFieldArray index={index} />
        </div>
       )
      })}

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