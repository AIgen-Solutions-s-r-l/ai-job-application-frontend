import React, { FC, ReactElement, useCallback } from "react";
import { JobProfile, LegalAuthorization, WorkPreferences } from "@/libs/definitions";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormInput, InputWrapper } from "@/components/ui/form-input";

type FormData = Pick<JobProfile, "additionalInfo">

export const ProjectsNestedFieldArray: FC = (): ReactElement => {
  const { control, register, formState: { errors } } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ control, name: `additionalInfo.projects` });

  return (
    <div className="flex flex-col p-10 rounded-[22px] bg-white">
      {fields.map((project, index) => (
        <div key={project.id} className="flex-col w-full">
          <div className="flex gap-2 mb-2 w-full">
            <button
              type="button"
              disabled={fields.length === 1}
              className="remove-nested mt-[28px]"
              onClick={() => remove(index)}
            >
              <span className="text-base">−</span>
            </button>
            <div className="flex flex-col gap-4 w-full">
              <div className="grid grid-cols-2 gap-form w-full">
                <FormInput
                  title={'Project Name'}
                  {...register(`additionalInfo.projects.${index}.name`, { required: 'Project Name is required' })}
                  placeholder="Project Name"
                  error={!!errors.additionalInfo?.projects?.[index]?.name}
                  errorMessage={errors.additionalInfo?.projects?.[index]?.name?.message}
                  className='w-full'
                />
                <FormInput
                  title={'Project Link'}
                  {...register(`additionalInfo.projects.${index}.link`, {
                    required: 'Project link is required',
                    pattern: {
                      value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
                      message: 'Invalid URL format',
                    },
                  })}
                  placeholder="Project Link"
                  error={!!errors.additionalInfo?.projects?.[index]?.link}
                  errorMessage={errors.additionalInfo?.projects?.[index]?.link?.message}
                  className='w-full'
                />
              </div>
              <div className="w-full">
                <label className="flex justify-start text-base leading-none mb-3 font-jura font-semibold">
                  Project Description <span className="text-error ml-1">*</span>
                </label>
                <textarea
                  {...register(`additionalInfo.projects.${index}.description`, { required: 'Project Description is required' })}
                  placeholder="Project Description"
                  className={`w-full bg-white outline-none border-[1px] border-my-neutral-4 focus:border-primary-light-purple placeholder:text-base h-20 px-[10px] pt-3 rounded-md text-[18px] font-jura ${errors.additionalInfo?.projects?.[index]?.description ? 'placeholder-shown:border-error' : 'placeholder-shown:border-my-neutral-4'
                    }`}
                />
                {errors.additionalInfo?.projects?.[index]?.description &&
                  <p className="text-error mt-1 text-xs leading-none">{errors.additionalInfo?.projects[index].description.message}</p>
                }
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="add-nested"
        onClick={() => append({ name: "", description: "", link: "" })}
      >
        <span className="text-2xl">+</span>
        <p className="text-base">Add Project</p>
      </button>
    </div>
  )
}

export const CertificationsNestedFieldArray: FC = (): ReactElement => {
  const { control, register } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ control, name: `additionalInfo.certifications` });

  return (
    <div className="flex flex-col p-10 rounded-[22px] bg-white">
      <div className="flex gap-2 mb-3">
        <div className="w-10"></div>
        <div className="w-full grid grid-cols-2 gap-form">
          <label className="w-full flex justify-start text-base leading-none font-semibold">
            Certification Name
          </label>
          <label className="w-full flex justify-start text-base leading-none font-semibold">
            Certification Description
          </label>
        </div>
      </div>

      {fields.map((certification, index) => (
        <div key={certification.id} className="flex-col w-full">
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              disabled={fields.length === 1}
              className="remove-nested"
              onClick={() => remove(index)}
            >
              <span className="text-base">−</span>
            </button>
            <div className="w-full grid grid-cols-2 gap-form">
              <div className="w-full">
                <input
                  {...register(`additionalInfo.certifications.${index}.name`)}
                  placeholder="e.g., Certification Name"
                  className="my-input"
                />
              </div>
              <div className="w-full">
                <input
                  {...register(`additionalInfo.certifications.${index}.description`)}
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
        className="add-nested"
        onClick={() => append({ name: "", description: "" })}
      >
        <span className="text-2xl">+</span>
        <p className="text-base">Add Certification</p>
      </button>
    </div>
  )
}

const LanguageNestedFieldArray: FC = (): ReactElement => {
  const { control, register, formState: { errors } } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ control, name: `additionalInfo.languages` });

  return (
    <div className="flex flex-col p-10 rounded-[22px] bg-white">
      <div className="flex gap-2 mb-3">
        <div className="w-10"></div>
        <div className="w-full grid grid-cols-2 gap-form">
          <label className="w-full flex justify-start text-base leading-none font-semibold">
            Language <span className="text-error ml-1">*</span>
          </label>
          <label className="w-full flex justify-start text-base leading-none font-semibold">
            Proficiency <span className="text-error ml-1">*</span>
          </label>
        </div>
      </div>

      {fields.map((language, index) => (
        <div key={language.id} className="flex-col w-full">
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              disabled={fields.length === 1}
              className="remove-nested"
              onClick={() => remove(index)}
            >
              <span className="text-base">−</span>
            </button>
            <div className="w-full grid grid-cols-2 gap-form">
              <div className="w-full">
                <input
                  {...register(`additionalInfo.languages.${index}.language`, { required: 'Language is required' })}
                  placeholder="e.g., English"
                  className={
                    `my-input
                    ${errors.additionalInfo?.languages?.[index]?.language && "placeholder-shown:border-error"}`
                  }
                />
                {errors.additionalInfo?.languages?.[index]?.language && <p className="text-error mt-[2px] text-xs">{errors.additionalInfo?.languages[index].language.message}</p>}
              </div>
              <div className="w-full">
                <select
                  {...register(`additionalInfo.languages.${index}.proficiency`, { required: 'Proficiency is required' })}
                  // className="w-full h-10 bg-base-100 outline-none border-[1px] border-secondary focus:border-primary-light-purple px-[10px] rounded-md text-base"
                  className={
                    `w-full h-10 bg-white outline-none border-[1px] border-my-neutral-4 focus:border-primary-light-purple px-[10px] rounded-md text-base
                    ${errors.additionalInfo?.languages?.[index]?.proficiency ? "border-error" : "border-my-neutral-4"}`
                  }
                >
                  <option value="" disabled>Select Proficiency</option>
                  <option value="Native">Native or Bilingual</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Beginner">Beginner</option>
                </select>
                {errors.additionalInfo?.languages?.[index]?.proficiency && <p className="text-error mt-[2px] text-xs">{errors.additionalInfo?.languages[index].proficiency.message}</p>}
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="add-nested"
        onClick={() => append({ language: '', proficiency: '' })}
      >
        <span className="text-2xl">+</span>
        <p className="text-base">Add Language</p>
      </button>
    </div>
  )
}

const AchievementsNestedFieldArray: FC = (): ReactElement => {
  const { control, register } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ control, name: `additionalInfo.achievements` });

  return (
    <div className="flex flex-col p-10 rounded-[22px] bg-white">
      <div className="flex gap-2 mb-3">
        <div className="w-10"></div>
        <div className="w-full grid grid-cols-2 gap-form">
          <label className="w-full flex justify-start text-base leading-none font-semibold">
            Achievement Name
          </label>
          <label className="w-full flex justify-start text-base leading-none font-semibold">
            Achievement Description
          </label>
        </div>
      </div>

      {fields.map((achievement, index) => (
        <div key={achievement.id} className="flex-col w-full">
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              disabled={fields.length === 1}
              className="remove-nested"
              onClick={() => remove(index)}
            >
              <span className="text-base">−</span>
            </button>
            <div className="w-full grid grid-cols-2 gap-form">
              <div className="w-full">
                <input
                  {...register(`additionalInfo.achievements.${index}.name`)}
                  placeholder="e.g., Achievement Name"
                  className="my-input"
                />
              </div>
              <div className="w-full">
                <input
                  {...register(`additionalInfo.achievements.${index}.description`)}
                  placeholder="e.g., Achievement Description"
                  className="my-input"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="add-nested"
        onClick={() => append({ name: "", description: "" })}
      >
        <span className="text-2xl">+</span>
        <p className="text-base">Add Achievement</p>
      </button>
    </div>
  )
}

const InterestsFieldArray: FC = (): ReactElement => {
  const { getValues, setValue } = useFormContext<FormData>();
  const interests: string[] = getValues('additionalInfo.interests');

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeout: ReturnType<typeof setTimeout> | undefined; // Correct type
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const handleInterestsChange = useCallback(
    (value: string) => {
      const interestsArray = value.split(',').map(skill => skill.trim()).filter(Boolean);
      setValue(`additionalInfo.interests`, interestsArray);
    },
    [setValue]
  );

  const debouncedHandleInterestsChange = useCallback(
    debounce(handleInterestsChange, 500),
    [handleInterestsChange]
  );

  return (
    <div className="flex p-10 rounded-[22px] bg-white">
      <div className="w-full">
        <label className="flex justify-start text-base leading-none mb-3 font-jura font-semibold">
          Interests
        </label>
        <textarea
          onChange={(e) => debouncedHandleInterestsChange(e.target.value)} // Use the debounced function
          defaultValue={interests ? interests.join(', ') : ''}
          placeholder="Hobbies (separate them with commas)"
          className="w-full bg-white outline-none border-[1px] border-my-neutral-4 focus:border-primary-light-purple placeholder-shown:border-my-neutral-4 placeholder:text-base h-20 px-[10px] pt-3 rounded-md text-[18px]"
        />
      </div>
    </div>
  )
}

export const AdditionalInfoOnboarding: FC = (): ReactElement => {
  const { register, getValues } = useFormContext<FormData>();

  const legalAuthorizations: LegalAuthorization = getValues('additionalInfo.legal_authorization');
  const workPreferences: WorkPreferences = getValues('additionalInfo.work_preferences');

  return (
    <div className="flex flex-col gap-5">
      <ProjectsNestedFieldArray />

      <CertificationsNestedFieldArray />

      <LanguageNestedFieldArray />

      <InputWrapper>
        <FormInput
          title={'Availability'}
          {...register('additionalInfo.availability.notice_period')}
          required={false}
          placeholder="e.g., 2 weeks"
          className='w-[294px]'
        />
        <FormInput
          title={'Salary Expectations (USD)'}
          {...register('additionalInfo.salary_expectations.salary_range_usd')}
          required={false}
          placeholder="e.g., 50000 - 60000"
          className='grow'
        />
        <FormInput
          title={'Gender'}
          {...register('additionalInfo.self_identification.gender')}
          required={false}
          placeholder="Male"
          className='w-[149px]'
        />
        <FormInput
          title={'Pronouns'}
          {...register('additionalInfo.self_identification.pronouns')}
          required={false}
          placeholder="He/Him"
          className='w-[149px]'
        />
        <FormInput
          title={'Ethnicity'}
          {...register('additionalInfo.self_identification.ethnicity')}
          required={false}
          placeholder="e.g., Hispanic"
          className='w-[268px]'
        />
      </InputWrapper>

      <AchievementsNestedFieldArray />

      <InterestsFieldArray />

      <div className="w-full p-10 rounded-[22px] bg-white">
        <label className="w-full flex justify-start text-base leading-none mb-3 font-semibold">
          Specific Details
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center capitalize">
            <input
              {...register(`additionalInfo.self_identification.veteran`)}
              type="checkbox"
              className="checkbox checkbox-primary rounded-md mr-2"
            />
            <span className="span">Veteran</span>
          </label>

          <label className="flex items-center capitalize">
            <input
              {...register(`additionalInfo.self_identification.disability`)}
              type="checkbox"
              className="checkbox checkbox-primary rounded-md mr-2"
            />
            <span className="span">Disability</span>
          </label>
        </div>
      </div>

      {/* Legal Authorization */}
      <div className="w-full p-10 rounded-[22px] bg-white">
        <label className="w-full flex justify-start text-base leading-none mb-3 font-semibold">
          Legal Authorization
        </label>
        <div className="grid grid-cols-2 gap-3">
          {Object.keys(legalAuthorizations)
            .filter(key => typeof legalAuthorizations[key as keyof LegalAuthorization] === "boolean")
            .map((key: keyof LegalAuthorization) => (
              <label key={key} className="flex items-center capitalize">
                <input
                  {...register(`additionalInfo.legal_authorization.${key}`)}
                  type="checkbox"
                  className="checkbox checkbox-primary rounded-md mr-2"
                />
                <span className="capitalize">{key.replace(/_/g, " ")}</span>
              </label>
            ))}
        </div>
      </div>

      {/* Work Preferences */}
      <div className="w-full p-10 rounded-[22px] bg-white">
        <label className="w-full flex justify-start text-base leading-none mb-3 font-semibold">
          Work Preferences
        </label>
        <div className="grid grid-cols-2 gap-3">
          {Object.keys(workPreferences)
            .filter(key => typeof workPreferences[key as keyof WorkPreferences] === "boolean")
            .map((key: keyof WorkPreferences) => (
              <label key={key} className="flex items-center">
                <input
                  {...register(`additionalInfo.work_preferences.${key}`)}
                  type="checkbox"
                  className="checkbox checkbox-primary rounded-md mr-2"
                />
                <span className="span w-full capitalize">{key.replace(/_/g, " ")}</span>
              </label>
            ))}
        </div>
      </div>
    </div>
  );
};