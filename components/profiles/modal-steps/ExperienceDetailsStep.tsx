import React, { FC, ReactElement } from "react";
import { JobProfile } from "@/libs/definitions";
import { useFieldArray, useFormContext } from "react-hook-form";

type FormData = Pick<JobProfile, "experienceDetails">

const ResponsibilityNestedFieldArray: FC<{ index: number; }> = ({
  index,
}: {
  index: number;
}): ReactElement => {
  const { register, formState: { errors } } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ 
    name: `experienceDetails.${index}.key_responsibilities`, 
    // rules: { required: 'At least one responsibility is required' }
  })

  return (
    <>
      {fields.map((responsibility, respIndex) => (
        <div key={responsibility.id} className="flex items-center gap-2 mb-2">
          <button
            type="button"
            className="btn btn-sm btn-outline btn-error"
            onClick={() => remove(respIndex)}
          >
            <span className="text-sm">−</span>
          </button>
          <input
            {...register(`experienceDetails.${index}.key_responsibilities.${respIndex}`, { required: 'Responsibility field is required.' })}
            placeholder="e.g., Led a team of developers to build scalable applications"
            className={`input input-bordered w-full ${errors.experienceDetails?.[index]?.key_responsibilities?.[respIndex] ? 'input-error' : ''}`}
          />
        </div>
      ))}
      {errors.experienceDetails?.[index]?.key_responsibilities?.root && <p className="text-error mt-1">{errors.experienceDetails?.[index]?.key_responsibilities?.root?.message}</p>}
      <button
        type="button"
        className="btn btn-sm mt-2"
        onClick={() => append('')}
      >
        <span className="text-xl">+</span> Add Responsibility
      </button>
    </>
  )
}

const SkillsNestedFieldArray: FC<{ index: number; }> = ({
  index,
}: {
  index: number;
}): ReactElement => {
  const { register, formState: { errors } } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ 
    name: `experienceDetails.${index}.skills_acquired`, 
    // rules: { required: 'At least one skill is required' } 
  })

  return (
    <>
      {fields.map((responsibility, respIndex) => (
        <div key={responsibility.id} className="flex items-center gap-2 mb-2">
          <button
            type="button"
            className="btn btn-sm btn-outline btn-error"
            onClick={() => remove(respIndex)}
          >
            <span className="text-sm">−</span>
          </button>
          <input
            {...register(`experienceDetails.${index}.skills_acquired.${respIndex}`, { required: 'Responsibility field is required.' })}
            placeholder="e.g., Led a team of developers to build scalable applications"
            className={`input input-bordered w-full ${errors.experienceDetails?.[index]?.skills_acquired?.[respIndex] ? 'input-error' : ''}`}
          />
        </div>
      ))}
      {errors.experienceDetails?.[index]?.skills_acquired?.root && <p className="text-error mt-1">{errors.experienceDetails?.[index]?.skills_acquired?.root.message}</p>}
      <button
        type="button"
        className="btn btn-sm mt-2"
        onClick={() => append('')}
      >
        <span className="text-xl">+</span> Add Responsibility
      </button>
    </>
  )
}

const ExperienceDetailsStep: FC = (): ReactElement => {
  const { control, register, formState: { errors } } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({ control, name: "experienceDetails", rules: { required: 'At least one experience is required' } });

  const handleAddExperience = () =>
    append({
      position: "",
      company: "",
      employment_period: "",
      location: "",
      industry: "",
      key_responsibilities: [],
      skills_acquired: [],
    });

  return (
    <div>
      <h3 className="font-bold text-base mb-4">Experience Details</h3>

      {errors.experienceDetails?.root && <p className="text-error">{errors.experienceDetails.root.message}</p>}
      {fields.map((experience, index) => (
        <div key={experience.id} className="mb-6 border-b pb-4">
          <h4 className="font-semibold text-base mb-2">Experience {index + 1}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Position - Required */}
            <div>
              <label className="label flex justify-start">
                Position <span className="text-error ml-1">*</span>
              </label>
              <input
                {...register(`experienceDetails.${index}.position`, { required: 'Position is required' })}
                placeholder="e.g., Software Engineer"
                className={`input input-bordered w-full ${errors.experienceDetails?.[index]?.position ? 'input-error' : ''}`}
              />
              {errors.experienceDetails?.[index]?.position && (
                <p className="text-error mt-1">{errors.experienceDetails?.[index]?.position.message}</p>
              )}
            </div>

            {/* Company - Required */}
            <div>
              <label className="label flex justify-start">
                Company <span className="text-error ml-1">*</span>
              </label>
              <input
                {...register(`experienceDetails.${index}.company`, { required: 'Company is required' })}
                placeholder="e.g., Google"
                className={`input input-bordered w-full ${errors.experienceDetails?.[index]?.company ? 'input-error' : ''}`}
              />
              {errors.experienceDetails?.[index]?.company && (
                <p className="text-error mt-1">{errors.experienceDetails?.[index]?.company.message}</p>
              )}
            </div>

            {/* Employment Period - Required */}
            <div>
              <label className="label flex justify-start">
                Employment Period <span className="text-error ml-1">*</span>
              </label>
              <input
                {...register(`experienceDetails.${index}.employment_period`, { required: 'Employment period is required' })}
                placeholder="e.g., June 2020 - Present"
                className={`input input-bordered w-full ${errors.experienceDetails?.[index]?.employment_period ? 'input-error' : ''}`}
              />
              {errors.experienceDetails?.[index]?.employment_period && (
                <p className="text-error mt-1">{errors.experienceDetails?.[index]?.employment_period.message}</p>
              )}
            </div>

            {/* Location - Required */}
            <div>
              <label className="label flex justify-start">
                Location <span className="text-error ml-1">*</span>
              </label>
              <input
                {...register(`experienceDetails.${index}.location`, { required: 'Location is required' })}
                placeholder="e.g., San Francisco, CA"
                className={`input input-bordered w-full ${errors.experienceDetails?.[index]?.location ? 'input-error' : ''}`}
              />
              {errors.experienceDetails?.[index]?.location && (
                <p className="text-error mt-1">{errors.experienceDetails?.[index]?.location.message}</p>
              )}
            </div>

            {/* Industry - Required */}
            <div>
              <label className="label flex justify-start">
                Industry <span className="text-error ml-1">*</span>
              </label>
              <input
                {...register(`experienceDetails.${index}.industry`, { required: 'Industry is required' })}
                placeholder="e.g., Tech"
                className={`input input-bordered w-full ${errors.experienceDetails?.[index]?.industry ? 'input-error' : ''}`}
              />
              {errors.experienceDetails?.[index]?.industry && (
                <p className="text-error mt-1">{errors.experienceDetails?.[index]?.industry.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="label flex justify-start">
                Key Responsibilities <span className="text-error ml-1">*</span>
              </label>
              <ResponsibilityNestedFieldArray index={index} />
            </div>

            <div className="md:col-span-2">
              <label className="label flex justify-start">
                Skills Acquired <span className="text-error ml-1">*</span>
              </label>
              <SkillsNestedFieldArray index={index} />
            </div>
          </div>

          {/* Botón para eliminar experiencia */}
          {fields.length > 1 && (
            <button
              type="button"
              className="btn btn-error mt-6"
              onClick={() => remove(index)}
            >
              Remove Experience
            </button>
          )}
        </div>
      ))}

      {/* Botón para agregar nueva experiencia */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleAddExperience}>
        Add Experience
      </button>
    </div>
  );
};

export default ExperienceDetailsStep;