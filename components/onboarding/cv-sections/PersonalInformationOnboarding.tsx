import { FormInput } from '@/components/ui/form-input';
import { JobProfile } from '@/libs/definitions';
import React from 'react';
import { useFormContext } from 'react-hook-form';

type FormData = Pick<JobProfile, "personalInfo">

export const PersonalInformationOnboarding: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();

  return (
    <div className="">
      {/* Title */}
      <h5 className='font-semibold text-xl mb-5'>Personal Information</h5>

      <div className="flex flex-col gap-5">
        {/* Name, Surname, Date */}
        <div className="flex gap-form">
          <FormInput
            title={'Name'}
            {...register('personalInfo.name', { required: 'Name is required' })}
            placeholder="e.g., John"
            error={!!errors.personalInfo?.name}
            errorMessage={errors.personalInfo?.name?.message}
            className='w-[194px]'
          />
          <FormInput
            title={'Last Name'}
            {...register('personalInfo.surname', { required: 'Surname is required' })}
            placeholder="e.g., Doe"
            error={!!errors.personalInfo?.surname}
            errorMessage={errors.personalInfo?.surname?.message}
            className='w-[267px]'
          />
          <FormInput
            title={'Date of Birth'}
            {...register('personalInfo.date_of_birth', { required: 'Date of Birth is required' })}
            type="date"
            error={!!errors.personalInfo?.date_of_birth}
            errorMessage={errors.personalInfo?.date_of_birth?.message}
            className='w-[167px]'
          />
        </div>

        {/* Address */}
        <div className="flex gap-form">
          <FormInput
            title={'City'}
            {...register('personalInfo.city', { required: 'City is required' })}
            placeholder="e.g., New York"
            error={!!errors.personalInfo?.city}
            errorMessage={errors.personalInfo?.city?.message}
            className='w-[194px]'
          />
          <FormInput
            title={'Address'}
            {...register('personalInfo.address', { required: 'Address is required' })}
            placeholder="e.g., 1234 Broadway St."
            error={!!errors.personalInfo?.address}
            errorMessage={errors.personalInfo?.address?.message}
            className='w-[447px]'
          />
          <FormInput
            title={'State / Province'}
            // {...register('personalInfo.state')}
            placeholder="N/A"
            required={false}
            // error={!!errors.personalInfo?.state}
            // errorMessage={errors.personalInfo?.state?.message}
            disabled
            className='w-[149px]'
          />
          <FormInput
            title={'Zip / Postal'}
            {...register('personalInfo.zip_code')}
            required={false}
            placeholder="N/A"
            error={!!errors.personalInfo?.zip_code}
            errorMessage={errors.personalInfo?.zip_code?.message}
            className='w-[149px]'
          />
          <FormInput
            title={'Country'}
            {...register('personalInfo.country', { required: 'Country is required' })}
            placeholder="e.g., USA"
            error={!!errors.personalInfo?.country}
            errorMessage={errors.personalInfo?.country?.message}
            className='w-[268px]'
          />
        </div>

        {/* Contacts */}
        <div className="flex gap-form">
          <FormInput
            title={'Phone prefix'}
            {...register('personalInfo.phone_prefix', { required: 'Phone prefix is required' })}
            placeholder="e.g., +1"
            error={!!errors.personalInfo?.phone_prefix}
            errorMessage={errors.personalInfo?.phone_prefix?.message}
            className='w-[194px]'
          />
          <FormInput
            title={'Phone'}
            {...register('personalInfo.phone', { required: 'Phone is required' })}
            placeholder="e.g., 5551234567"
            error={!!errors.personalInfo?.phone}
            errorMessage={errors.personalInfo?.phone?.message}
            className='w-[186px]'
          />
          <FormInput
            title={'Email'}
            {...register('personalInfo.email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9.]{8,}@[a-zA-Z0-9]{3,}\.[a-zA-Z0-9]+$/,
                message: 'Invalid email address',
              },
            })}
            type="email"
            placeholder="e.g., john.doe@example.com"
            error={!!errors.personalInfo?.email}
            errorMessage={errors.personalInfo?.email?.message}
            className='w-[579px]'
          />
        </div>

        {/* Socials */}
        <div className="flex gap-form">
          <FormInput
            title={'Github'}
            {...register('personalInfo.github', {
              setValueAs: (value) => value || undefined,
              pattern: {
                value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
                message: 'Invalid URL format',
              },
            })}
            required={false}
            type="url"
            placeholder="e.g., https://github.com/johndoe"
            error={!!errors.personalInfo?.github}
            errorMessage={errors.personalInfo?.github?.message}
            className='w-[402px]'
          />
          <FormInput
            title={'Linkedin'}
            {...register('personalInfo.linkedin', {
              setValueAs: (value) => value || undefined,
              pattern: {
                value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
                message: 'Invalid URL format',
              },
            })}
            required={false}
            type="url"
            placeholder="e.g., https://linkedin.com/in/johndoe"
            error={!!errors.personalInfo?.linkedin}
            errorMessage={errors.personalInfo?.linkedin?.message}
            className='w-[579px]'
          />
        </div>
      </div>
    </div>
  );
};