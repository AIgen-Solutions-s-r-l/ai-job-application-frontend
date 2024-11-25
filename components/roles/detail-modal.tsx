import { JobRole } from "@/libs/definitions";
import React, { useEffect, ChangeEvent } from "react";
import { Controller, useForm } from "react-hook-form";

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  existingJob?: JobRole;
  onSubmit: (job: JobRole) => void;
}

const defaultJobRole: JobRole = {
  profile_id: '',
  job_title: '',
  location: '',
  job_type: {
    other: false,
    contract: false,
    fullTime: false,
    partTime: false,
    temporary: false,
    volunteer: false,
    internship: false
  },
  work_type: '',
  experience_level: {
    entry: false,
    director: false,
    associate: false,
    executive: false,
    midSenior: false,
    internship: false
  },
  date: {
    allTime: false,
    lastWeek: false,
    lastMonth: false,
    last24Hours: false
  },
  apply_once_at_company: false,
  company_blacklist: [],
  title_blacklist: [],
  min_applicants: 0,
  max_applicants: 100,
  created_at: '',
  updated_at: '',
}


const JobRoleDetail = ({ isModalOpen, setIsModalOpen, onSubmit, existingJob }: ModalProps) => {
  const { control, register, reset, getValues, handleSubmit, watch, formState: { errors } } = useForm<JobRole>({ mode: "all", defaultValues: defaultJobRole });

  const jobTypes = getValues(`job_type`);
  const experienceLevels = getValues(`experience_level`);
  const dateTypes = getValues(`date`);

  const max = watch(`max_applicants`);

  useEffect(() => {
    reset(existingJob || defaultJobRole);
  }, [existingJob, reset]);

  return (
    <>
      <input type="checkbox" id="job-role-detail-modal" className="modal-toggle" checked={isModalOpen} onChange={() => setIsModalOpen(false)} />
      <div className="modal">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="modal-box w-11/12 max-w-4xl h-[95vh] rounded-xl flex flex-col px-0"
        >
          {/* Header */}
          <div className="modal-header flex justify-between items-center mb-4 px-6">
            <h3 className="text-base font-semibold leading-7">
              {existingJob ? "Edit Job Role" : "Add New Job Role"}
            </h3>
            <label htmlFor="job-role-detail-modal" className="btn btn-sm btn-circle btn-ghost">
              ✕
            </label>
          </div>

          {/* Contenedor con scroll */}
          <div className="flex-grow overflow-y-auto px-6">
            {/* Job Title */}
            <div className="mb-4">
              <label className="label capitalize">Job Title</label>
              <input
                {...register(`job_title`, { required: 'Job Title is required' })}
                placeholder="e.g., Software Engineer"
                className={`input input-bordered w-full capitalize ${errors.job_title ? 'input-error' : ''}`}
              />
              {errors.job_title && <p className="text-error">{errors.job_title.message}</p>}
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="label capitalize">Location</label>
              <input
                {...register(`location`, { required: 'Location is required' })}
                placeholder="e.g., Portugal, Chicago, Paris"
                className={`input input-bordered w-full capitalize ${errors.location ? 'input-error' : ''}`}
              />
              {errors.location && <p className="text-error">{errors.location.message}</p>}
            </div>

            {/* Job Types */}
            <div className="mb-4">
              <label className="label capitalize">Job Types</label>
              <div className="grid grid-cols-4 gap-2">
                {jobTypes && Object.keys(jobTypes).map(type => (
                  <label key={type} className="flex items-center capitalize">
                    <input
                      {...register(`job_type.${type}`)}
                      type="checkbox"
                      className="checkbox checkbox-primary mr-2"
                    />
                    <span className="capitalize">{type.replace(/([A-Z])/g, ' $1')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Work Type */}
            <div className="mb-4">
              <label className="label capitalize">Work Type</label>
              <select
                {...register(`work_type`, { required: 'Work Type is required' })}
                className={`select select-bordered w-full capitalize ${errors.work_type ? 'select-error' : ''}`}
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Onsite">Onsite</option>
              </select>
              {errors.work_type && <p className="text-error">{errors.work_type.message}</p>}
            </div>

            {/* Experience Level */}
            <div className="mb-4">
              <label className="label capitalize">Experience Level</label>
              <div className="grid grid-cols-4 gap-2">
                {experienceLevels && Object.keys(experienceLevels).map(level => (
                  level !== "internship" && ( // No mostramos internship en experienceLevel
                    <label key={level} className="flex items-center capitalize">
                      <input
                        {...register(`experience_level.${level}`)}
                        type="checkbox"
                        className="checkbox checkbox-primary mr-2"
                      />
                      <span className="capitalize">{level.replace(/([A-Z])/g, ' $1')}</span>
                    </label>
                  )
                ))}
              </div>
            </div>

            {/* Publish Date */}
            <div className="mb-4">
              <label className="label capitalize">Publish Date</label>
              <div className="grid grid-cols-4 gap-2">
                {dateTypes && Object.keys(dateTypes).map(dateType => (
                  <label key={dateType} className="flex items-center capitalize">
                    <input
                      {...register(`date.${dateType}`)}
                      type="checkbox"
                      className="checkbox checkbox-primary mr-2"
                    />
                    <span className="capitalize">
                      {dateType === "allTime" ? "All time" : dateType === "lastMonth" ? "Last month" : dateType === "lastWeek" ? "Last week" : "Last 24 hours"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Apply Once at Company */}
            <div className="mb-4">
              <label className="label capitalize">Apply Once at Company</label>
              <label className="flex items-center capitalize">
                <input
                  {...register(`apply_once_at_company`)}
                  type="checkbox"
                  className="checkbox checkbox-primary mr-2"
                />
                <span className="capitalize">Apply</span>
              </label>
            </div>

           {/* Company Blacklist */}
            <div className="mb-4">
              <label className="label capitalize">Company Blacklist</label>
              <Controller
                name="company_blacklist"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    value={field?.value?.join(',')}
                    onChange={(ev: ChangeEvent<HTMLInputElement>) => {
                      field.onChange(ev.target.value ? ev.target.value.split(',') : []);
                    }}
                    className="input input-bordered w-full capitalize"
                    placeholder="e.g., Wayfair, Crossover"
                  />
                )}
              />
            </div>

            {/* Title Blacklist */}
            <div className="mb-4">
              <label className="label capitalize">Title Blacklist</label>
              <Controller
                name="title_blacklist"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    value={field?.value?.join(',')}
                    onChange={(ev: ChangeEvent<HTMLInputElement>) => {
                      field.onChange(ev.target.value ? ev.target.value.split(',') : []);
                    }}
                    className="input input-bordered w-full capitalize"
                    placeholder="e.g., Java, PHP, .NET"
                  />
                )}
              />
            </div>

            {/* Job Applicants Threshold (Slider) */}
            <div className="mb-4">
              <label className="label capitalize">Job Applicants</label>
              <div className="flex space-x-4">
                <input
                  {...register(`max_applicants`)}
                  type="range"
                  min="0"
                  max="100"
                  className="range range-primary"
                />
              </div>
              <div className="flex justify-between capitalize">
                <span>Min: 0</span>
                <span>Max: {max || 0}</span>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="modal-action bg-base-100 px-6">
            <button type="button" className="btn capitalize" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary capitalize mr-2">
              {existingJob ? "Update Role" : "Add Role"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default JobRoleDetail;