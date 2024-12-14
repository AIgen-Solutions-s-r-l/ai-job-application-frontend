import React, { FC, ReactElement } from "react";
import { JobProfile } from "@/libs/definitions";
import { useFieldArray, useFormContext } from "react-hook-form";

type FormData = Pick<JobProfile, "educationDetails">;

const EducationDetailsStep: FC = (): ReactElement => {
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
    <div>
      <h3 className="font-bold text-base mb-4">Education Details</h3>

      {errors.educationDetails?.root && <p className="text-error">{errors.educationDetails.root.message}</p>}
      {/* Mapeo de los campos de educación */}
      {fields.map((education, index) => (
        <div key={education.id} className="mb-6 border-b pb-4">
          <h4 className="font-semibold text-base mb-2">Education {index + 1}</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Education Level - Required */}
            <div>
              <label className="label flex justify-start">
                Education Level <span className="text-error ml-1">*</span>
              </label>
              <input
                {...register(`educationDetails.${index}.education_level`, { required: 'Education level is required' })}
                placeholder="e.g., Bachelor's Degree"
                className={`input input-bordered w-full ${errors.educationDetails?.[index]?.education_level ? 'input-error' : ''}`}
              />
              {errors.educationDetails?.[index]?.education_level && (
                <p className="text-error mt-1">{errors.educationDetails?.[index]?.education_level.message}</p>
              )}
            </div>

            {/* Institution - Required */}
            <div>
              <label className="label flex justify-start">
                Institution <span className="text-error ml-1">*</span>
              </label>
              <input
                {...register(`educationDetails.${index}.institution`, { required: 'Institution is required' })}
                placeholder="e.g., Harvard University"
                className={`input input-bordered w-full ${errors.educationDetails?.[index]?.institution ? 'input-error' : ''}`}
              />
              {errors.educationDetails?.[index]?.institution && (
                <p className="text-error mt-1">{errors.educationDetails?.[index]?.institution.message}</p>
              )}
            </div>

            {/* Field of Study - Required */}
            <div>
              <label className="label flex justify-start">
                Field of Study <span className="text-error ml-1">*</span>
              </label>
              <input
                {...register(`educationDetails.${index}.field_of_study`, { required: 'Field of study is required' })}
                placeholder="e.g., Computer Science"
                className={`input input-bordered w-full ${errors.educationDetails?.[index]?.field_of_study ? 'input-error' : ''}`}
              />
              {errors.educationDetails?.[index]?.field_of_study && (
                <p className="text-error mt-1">{errors.educationDetails?.[index]?.field_of_study.message}</p>
              )}
            </div>

            {/* Final Evaluation Grade - Required */}
            <div>
              <label className="label flex justify-start">
                Final Evaluation Grade <span className="text-error ml-1">*</span>
              </label>
              <input
                {...register(`educationDetails.${index}.final_evaluation_grade`, { required: 'Final evaluation grade is required' })}
                placeholder="e.g., 3.8/4.0"
                className={`input input-bordered w-full ${errors.educationDetails?.[index]?.final_evaluation_grade ? 'input-error' : ''}`}
              />
              {errors.educationDetails?.[index]?.final_evaluation_grade && (
                <p className="text-error mt-1">{errors.educationDetails?.[index]?.final_evaluation_grade.message}</p>
              )}
            </div>

            {/* Start Date - Required */}
            <div>
              <label className="label flex justify-start">
                Start Date <span className="text-error ml-1">*</span>
              </label>
              <input
                {...register(`educationDetails.${index}.start_date`, { required: 'Year of completion is required' })}
                placeholder="e.g., 2015"
                className={`input input-bordered w-full ${errors.educationDetails?.[index]?.start_date ? 'input-error' : ''}`}
              />
              {errors.educationDetails?.[index]?.start_date && (
                <p className="text-error mt-1">{errors.educationDetails?.[index]?.start_date.message}</p>
              )}
            </div>

            {/* Year of Completion - Required */}
            <div>
              <label className="label flex justify-start">
                Year of Completion <span className="text-error ml-1">*</span>
              </label>
              <input
                {...register(`educationDetails.${index}.year_of_completion`, { required: 'Year of completion is required' })}
                placeholder="e.g., 2019"
                className={`input input-bordered w-full ${errors.educationDetails?.[index]?.year_of_completion ? 'input-error' : ''}`}
              />
              {errors.educationDetails?.[index]?.year_of_completion && (
                <p className="text-error mt-1">{errors.educationDetails?.[index]?.year_of_completion.message}</p>
              )}
            </div>
          </div>

          {/* Botón para eliminar una entrada de educación */}
          {fields.length > 1 && (
            <button
              type="button"
              className="btn btn-error mt-4"
              onClick={() => remove(index)}
            >
              Remove Education
            </button>
          )}
        </div>
      ))}

      {/* Botón para agregar más educación */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={addEducation}
      >
        Add Education
      </button>
    </div>
  );
};

export default EducationDetailsStep;