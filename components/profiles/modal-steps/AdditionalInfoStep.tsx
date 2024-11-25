import React, { FC, ReactElement } from "react";
import { JobProfile, LegalAuthorization, WorkPreferences } from "@/libs/definitions";
import { useFieldArray, useFormContext } from "react-hook-form";

type FormData = Pick<JobProfile, "additionalInfo">

const LanguageNestedFieldArray: FC = (): ReactElement => {
  const { control, register, formState: { errors } } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ control, name: `additionalInfo.languages`, rules: { required: 'At least one language is required' } });

  return (
    <>
      {errors.additionalInfo?.languages?.root && <p className="text-error">{errors.additionalInfo.languages.root.message}</p>}
      {fields.map((language, index) => (
        <div key={language.id} className="flex-col w-full">
          <div className="flex items-center gap-2 mb-2">
            <button
              type="button"
              onClick={() => remove(index)}
              className="btn btn-sm btn-outline btn-error"
            >
              <span className="text-sm">−</span>
            </button>
            <input
              {...register(`additionalInfo.languages.${index}.language`, { required: 'Language is required' })}
              placeholder="e.g., English"
              className={`input input-bordered w-full ${errors.additionalInfo?.languages?.[index]?.language ? 'input-error' : ''}`}
            />
            <select
              {...register(`additionalInfo.languages.${index}.proficiency`, { required: 'Proficiency is required' })}
              className={`select select-bordered w-full max-w-xs ${errors.additionalInfo?.languages?.[index]?.proficiency ? 'select-error' : ''}`}
            >
              <option disabled>Select Proficiency</option>
              <option value="Native">Native or Bilingual</option>
              <option value="Fluent">Fluent</option>
              <option value="Beginner">Beginner</option>
            </select>
          </div>
          {errors.additionalInfo?.languages?.[index]?.language && <p className="text-error">{errors.additionalInfo?.languages[index].language.message}</p>}
          {errors.additionalInfo?.languages?.[index]?.proficiency && <p className="text-error">{errors.additionalInfo?.languages[index].proficiency.message}</p>}
        </div>
      ))}
      <button
        type="button"
        className="btn btn-sm"
        onClick={() => append({ language: '', proficiency: '' })}
      >
        <span className="text-xl">+</span>
        Add Language
      </button>
    </>
  )
}

const ProjectsNestedFieldArray: FC = (): ReactElement => {
  const { control, register, formState: { errors } } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ control, name: `additionalInfo.projects`, rules: { required: 'At least one project is required' } });

  return (
    <>
      {errors.additionalInfo?.projects?.root && <p className="text-error">{errors.additionalInfo?.projects?.root.message}</p>}
      {fields.map((project, index) => (
        <div key={project.id} className="flex-col w-full">
          <div className="flex items-center gap-2 mb-2 w-full">
            <button
              type="button"
              onClick={() => remove(index)}
              className="btn btn-sm btn-outline btn-error"
            >
              <span className="text-sm">−</span>
            </button>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-2 w-full">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-2 w-full">
                <input
                  {...register(`additionalInfo.projects.${index}.name`, { required: 'Project name is required' })}
                  placeholder="Project Name"
                  className={`input input-bordered w-full ${errors.additionalInfo?.projects?.[index]?.name ? 'input-error' : ''}`}
                />
                <input
                  {...register(`additionalInfo.projects.${index}.link`, { required: 'Project link is required' })}
                  placeholder="Project Link"
                  className={`input input-bordered w-full ${errors.additionalInfo?.projects?.[index]?.link ? 'input-error' : ''}`}
                />
              </div>
              <textarea
                {...register(`additionalInfo.projects.${index}.description`, { required: 'Project description is required' })}
                placeholder="Project Description"
                className={`textarea textarea-bordered textarea-md w-full ${errors.additionalInfo?.projects?.[index]?.description ? 'textarea-error' : ''}`}
              />
            </div>
          </div>
          {errors.additionalInfo?.projects?.[index]?.name && <p className="text-error">{errors.additionalInfo?.projects[index].name.message}</p>}
          {errors.additionalInfo?.projects?.[index]?.link && <p className="text-error">{errors.additionalInfo?.projects[index].link.message}</p>}
          {errors.additionalInfo?.projects?.[index]?.description && <p className="text-error">{errors.additionalInfo?.projects[index].description.message}</p>}
        </div>
      ))}
      <button
        className="btn btn-sm"
        onClick={() => append({ name: "", description: "", link: "" })}
      >
        <span className="text-xl">+</span>
        Add Project
      </button>
    </>
  )
}

const AchievementsNestedFieldArray: FC = (): ReactElement => {
  const { control, register, formState: { errors } } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ control, name: `additionalInfo.achievements`, rules: { required: 'At least one achievement is required' } });

  return (
    <>
      {errors.additionalInfo?.achievements?.root && <p className="text-error">{errors.additionalInfo?.achievements?.root.message}</p>}
      {fields.map((achievement, index) => (
        <div key={achievement.id} className="flex-col w-full">
          <div className="flex items-center gap-2 mb-2">
            <button
              type="button"
              onClick={() => remove(index)}
              className="btn btn-sm btn-outline btn-error"
            >
              <span className="text-sm">−</span>
            </button>
            <input
              {...register(`additionalInfo.achievements.${index}.name`, { required: 'Achievement name is required' })}
              placeholder="Achievement Name"
              className={`input input-bordered w-full ${errors.additionalInfo?.achievements?.[index]?.name ? 'input-error' : ''}`}
            />
            <input
              {...register(`additionalInfo.achievements.${index}.description`, { required: 'Achievement description is required' })}
              placeholder="Achievement Description"
              className={`input input-bordered w-full ${errors.additionalInfo?.achievements?.[index]?.description ? 'input-error' : ''}`}
              required
            />
          </div>
          {errors.additionalInfo?.achievements?.[index]?.name && <p className="text-error">{errors.additionalInfo?.achievements[index].name.message}</p>}
          {errors.additionalInfo?.achievements?.[index]?.description && <p className="text-error">{errors.additionalInfo?.achievements[index].description.message}</p>}
        </div>
      ))}
      <button
        className="btn btn-sm"
        onClick={() => append({ name: "", description: "" })}
      >
        <span className="text-xl">+</span>
        Add Achievement
      </button>
    </>
  )
}

const AdditionalInfoStep: FC = (): ReactElement => {
  const { register, formState: { errors }, getValues } = useFormContext<FormData>();

  const legalAuthorizations: LegalAuthorization = getValues('additionalInfo.legalAuthorization');
  const workPreferences: WorkPreferences = getValues('additionalInfo.workPreferences');

  return (
    <div>
      <h3 className="font-bold text-base mb-4">Additional Information</h3>

      {/* Languages - Required */}
      <div className="mb-4">
        <label className="label flex justify-start">
          Languages <span className="text-error ml-1">*</span>
        </label>
        {/* Mostrar error global para lenguajes */}
        <LanguageNestedFieldArray />
      </div>

      {/* Projects - Required */}
      <div className="mb-4">
        <label className="label flex justify-start">
          Projects <span className="text-error ml-1">*</span>
        </label>
        {/* Mostrar error global para proyectos */}
        <ProjectsNestedFieldArray />
      </div>

      {/* Achievements - Required */}
      <div className="mb-4">
        <label className="label flex justify-start">
          Achievements <span className="text-error ml-1">*</span>
        </label>
        {/* Mostrar error global para logros */}
        <AchievementsNestedFieldArray />
      </div>

      {/* Availability - Required */}
      <div className="mb-4">
        <label className="label flex justify-start">
          Availability <span className="text-error ml-1">*</span>
        </label>
        <input
          {...register(`additionalInfo.availability`, { required: 'Availability is required' })}
          placeholder="e.g., 2 weeks"
          className={`input input-bordered w-full ${errors.additionalInfo?.availability ? 'input-error' : ''}`}
        />
        {errors.additionalInfo?.availability && <p className="text-error">{errors.additionalInfo?.availability.message}</p>}
      </div>

      {/* Salary Expectations - Required */}
      <div className="mb-4">
        <label className="label flex justify-start">
          Salary Expectations (USD) <span className="text-error ml-1">*</span>
        </label>
        <input
          {...register(`additionalInfo.salaryExpectations`, { required: 'Salary expectations are required' })}
          placeholder="e.g., 50000 - 60000"
          className={`input input-bordered w-full ${errors.additionalInfo?.salaryExpectations ? 'input-error' : ''}`}
        />
        {errors.additionalInfo?.salaryExpectations && <p className="text-error">{errors.additionalInfo?.salaryExpectations.message}</p>}
      </div>

      {/* Self-Identification - Required */}
      <div className="mb-4">
        <label className="label flex justify-start">
          Self Identification <span className="text-error ml-1">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <input
            {...register(`additionalInfo.selfIdentification.gender`, { required: 'Gender is required' })}
            placeholder="e.g., Male"
            className={`input input-bordered w-full ${errors.additionalInfo?.selfIdentification?.gender ? 'input-error' : ''}`}
          />
          <input
            {...register(`additionalInfo.selfIdentification.pronouns`, { required: 'Pronouns is required' })}
            placeholder="e.g., He/Him"
            className={`input input-bordered w-full ${errors.additionalInfo?.selfIdentification?.pronouns ? 'input-error' : ''}`}
          />
        </div>
        {errors.additionalInfo?.selfIdentification?.gender && <p className="text-error">{errors.additionalInfo?.selfIdentification.gender.message}</p>}
        {errors.additionalInfo?.selfIdentification?.pronouns && <p className="text-error">{errors.additionalInfo.selfIdentification.pronouns.message}</p>}

        <div className="grid grid-cols-2 gap-4 mt-4">
          <label className="flex items-center capitalize">
            <input
              {...register(`additionalInfo.selfIdentification.veteran`)}
              type="checkbox"
              className="checkbox checkbox-primary mr-2"
            />
            <span className="span">Veteran</span>
          </label>

          <label className="flex items-center capitalize">
            <input
              {...register(`additionalInfo.selfIdentification.disability`)}
              type="checkbox"
              className="checkbox checkbox-primary mr-2"
            />
            <span className="span">Disability</span>
          </label>

          <input
            {...register(`additionalInfo.selfIdentification.ethnicity`, { required: 'Ethnicity is required' })}
            placeholder="e.g., Hispanic"
            className={`input input-bordered w-full col-span-2 ${errors.additionalInfo?.selfIdentification?.ethnicity ? 'input-error' : ''}`}
          />
        </div>
        {errors.additionalInfo?.selfIdentification?.ethnicity && <p className="text-error">{errors.additionalInfo?.selfIdentification.ethnicity.message}</p>}
      </div>

      {/* Legal Authorization */}
      <div className="mb-4">
        <label className="label">Legal Authorization</label>
        <div className="grid grid-cols-2 gap-3">
          {Object.keys(legalAuthorizations)
            .filter(key => typeof legalAuthorizations[key as keyof LegalAuthorization] === "boolean")
            .map((key: keyof LegalAuthorization) => (
              <label key={key} className="flex items-center capitalize">
                <input
                  {...register(`additionalInfo.legalAuthorization.${key}`)}
                  type="checkbox"
                  className="checkbox checkbox-primary mr-2"
                />
                <span className="capitalize">{key.replace(/_/g, " ")}</span>
              </label>
            ))}
        </div>
      </div>

      {/* Work Preferences */}
      <div className="mb-4">
        <label className="label">Work Preferences</label>
        <div className="grid grid-cols-2 gap-3">
          {Object.keys(workPreferences)
            .filter(key => typeof workPreferences[key as keyof WorkPreferences] === "boolean")
            .map((key: keyof WorkPreferences) => (
              <label key={key} className="flex items-center">
                <input
                  {...register(`additionalInfo.workPreferences.${key}`)}
                  type="checkbox"
                  className="checkbox checkbox-primary mr-2"
                />
                <span className="span w-full capitalize">{key.replace(/_/g, " ")}</span>
              </label>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoStep;