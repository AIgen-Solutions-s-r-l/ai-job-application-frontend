import React, { FC, ReactElement } from "react";
import { JobProfile, PersonalInformation } from "@/libs/definitions";  // Importa la definición del tipo
import { useFormContext } from "react-hook-form";

type FormData = Pick<JobProfile, "personalInfo">

const PersonalInformationStep: FC = (): ReactElement => {
  const { register, formState: { errors } } = useFormContext<FormData>();

  return (
    <div>
      <h3 className="font-bold text-base mb-4">Personal Information</h3>

      {/* Grid para hacerlo compacto en dos columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label flex justify-start">Name <span className="text-error ml-1">*</span></label>
          <input
            {...register('personalInfo.name', { required: 'Name is required' })}
            placeholder="e.g., John"
            className={`input input-bordered w-full ${errors.personalInfo?.name ? 'input-error' : ''}`}
          />
          {errors.personalInfo?.name && <p className="text-error mt-1">{errors.personalInfo?.name.message}</p>}
        </div>

        <div>
          <label className="label flex justify-start">Surname <span className="text-error ml-1">*</span></label>
          <input
            {...register('personalInfo.surname', { required: 'Surname is required' })}
            placeholder="e.g., Doe"
            className={`input input-bordered w-full ${errors.personalInfo?.surname ? 'input-error' : ''}`}
          />
          {errors.personalInfo?.surname && <p className="text-error mt-1">{errors.personalInfo?.surname.message}</p>}
        </div>

        <div>
          <label className="label flex justify-start">Date of Birth <span className="text-error ml-1">*</span></label>
          <input
            {...register('personalInfo.date_of_birth', { required: 'Date of birth is required' })}
            type="date"
            className={`input input-bordered w-full ${errors.personalInfo?.date_of_birth ? 'input-error' : ''}`}
          />
          {errors.personalInfo?.date_of_birth && <p className="text-error mt-1">{errors.personalInfo?.date_of_birth?.message}</p>}
        </div>

        <div>
          <label className="label flex justify-start">Country <span className="text-error ml-1">*</span></label>
          <input
            {...register('personalInfo.country', { required: 'Country is required' })}
            type="text"
            placeholder="e.g., USA"
            className={`input input-bordered w-full ${errors.personalInfo?.country ? 'input-error' : ''}`}
          />
          {errors.personalInfo?.country && <p className="text-error mt-1">{errors.personalInfo?.country.message}</p>}
        </div>

        <div>
          <label className="label flex justify-start">City <span className="text-error ml-1">*</span></label>
          <input
            {...register('personalInfo.city', { required: 'City is required' })}
            placeholder="e.g., New York"
            className={`input input-bordered w-full ${errors.personalInfo?.city ? 'input-error' : ''}`}
          />
          {errors.personalInfo?.city && <p className="text-error mt-1">{errors.personalInfo?.city.message}</p>}
        </div>

        <div>
          <label className="label flex justify-start">Address <span className="text-error ml-1">*</span></label>
          <input
            {...register('personalInfo.address', { required: 'Address is required' })}
            placeholder="e.g., 1234 Broadway St."
            className={`input input-bordered w-full ${errors.personalInfo?.address ? 'input-error' : ''}`}
          />
          {errors.personalInfo?.address && <p className="text-error mt-1">{errors.personalInfo?.address.message}</p>}
        </div>

        <div>
          <label className="label flex justify-start">Phone Prefix <span className="text-error ml-1">*</span></label>
          <input
            {...register('personalInfo.phone_prefix', { required: 'Phone prefix is required' })}
            placeholder="e.g., +1"
            className={`input input-bordered w-full ${errors.personalInfo?.phone_prefix ? 'input-error' : ''}`}
          />
          {errors.personalInfo?.phone_prefix && <p className="text-error mt-1">{errors.personalInfo?.phone_prefix.message}</p>}
        </div>

        <div>
          <label className="label flex justify-start">Phone <span className="text-error ml-1">*</span></label>
          <input
            {...register('personalInfo.phone', { required: 'Phone is required' })}
            type="tel"
            placeholder="e.g., 5551234567"
            className={`input input-bordered w-full ${errors.personalInfo?.phone ? 'input-error' : ''}`}
          />
          {errors.personalInfo?.phone && <p className="text-error mt-1">{errors.personalInfo?.phone.message}</p>}
        </div>

        <div>
          <label className="label flex justify-start">Email <span className="text-error ml-1">*</span></label>
          <input
            {...register('personalInfo.email', { required: 'Email is required' })}
            type="email"
            placeholder="e.g., john.doe@example.com"
            className={`input input-bordered w-full ${errors.personalInfo?.email ? 'input-error' : ''}`}
          />
          {errors.personalInfo?.email && <p className="text-error mt-1">{errors.personalInfo?.email.message}</p>}
        </div>

        <div>
          <label className="label">GitHub</label>
          <input
            {...register('personalInfo.github')}
            type="url"
            placeholder="e.g., https://github.com/johndoe"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">LinkedIn</label>
          <input
            {...register('personalInfo.linkedin')}
            type="url"
            placeholder="e.g., https://linkedin.com/in/johndoe"
            className="input input-bordered w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationStep;