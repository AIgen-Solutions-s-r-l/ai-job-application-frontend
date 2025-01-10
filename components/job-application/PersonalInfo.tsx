import { PersonalInformation, Resume } from '@/libs/types/application.types';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput, InputWrapper } from '../ui/form-input';

type FormData = Pick<Resume, "header">

export const PersonalInfo: React.FC = () => {
  const { register } = useFormContext<FormData>();
  
  return (
    <div className="">
      <div className="flex flex-col gap-5">
        {/* Name */}
        <InputWrapper>
          <FormInput
            title={'First Name'}
            {...register('header.personal_information.name')}
            placeholder="e.g., John"
            className='grow'
          />
          <FormInput
            title={'Last Name'}
            {...register('header.personal_information.surname')}
            placeholder="e.g., Doe"

            className='grow'
          />
          <FormInput
            title={'Date of Birth'}
            {...register('header.personal_information.date_of_birth')}
            type="date"
            min="1980-01-01" 
            max={new Date().toLocaleDateString('en-ca')}
            className='w-[298px]'
          />
        </InputWrapper>

        {/* Address */}
        <InputWrapper>
          <FormInput
            title={'City'}
            {...register('header.personal_information.city')}
            placeholder="e.g., New York"
            className='w-[194px]'
          />
          <FormInput
            title={'Address'}
            {...register('header.personal_information.address')}
            placeholder="e.g., 1234 Broadway St."
            className='grow'
          />
          {/* <FormInput
            title={'State / Province'}
            {...register('header.personal_information.state')}
            placeholder="N/A"
            required={false}
            className='w-[149px]'
          />
          <FormInput
            title={'Zip / Postal'}
            {...register('header.personal_information.zip_code')}
            required={false}
            placeholder="N/A"
            className='w-[149px]'
          /> */}
          <FormInput
            title={'Country'}
            {...register('header.personal_information.country')}
            placeholder="e.g., USA"
            className='w-[268px]'
          />
        </InputWrapper>

        {/* Contacts */}
        <InputWrapper>
          <FormInput
            title={'Phone prefix'}
            {...register('header.personal_information.phone_prefix')}
            placeholder="e.g., +1"
            className='w-[194px]'
          />
          <FormInput
            title={'Phone'}
            {...register('header.personal_information.phone')}
            placeholder="e.g., 5551234567"
            className='w-[186px]'
          />
          <FormInput
            title={'Email'}
            {...register('header.personal_information.email', {
              pattern: {
                value: /^[a-zA-Z0-9.]{8,}@[a-zA-Z0-9]{3,}\.[a-zA-Z0-9]+$/,
                message: 'Invalid email address',
              },
            })}
            type="email"
            placeholder="e.g., john.doe@example.com"
            className='w-[579px]'
          />
        </InputWrapper>

        {/* Socials */}
        <InputWrapper>
          <FormInput
            title={'Github'}
            {...register('header.personal_information.github', {
              setValueAs: (value) => value || undefined,
              pattern: {
                value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
                message: 'Invalid URL format',
              },
            })}
            required={false}
            type="url"
            placeholder="e.g., https://github.com/johndoe"
            className='w-[402px]'
          />
          <FormInput
            title={'Linkedin'}
            {...register('header.personal_information.linkedin', {
              setValueAs: (value) => value || undefined,
              pattern: {
                value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
                message: 'Invalid URL format',
              },
            })}
            required={false}
            type="url"
            placeholder="e.g., https://linkedin.com/in/johndoe"
            className='w-[579px]'
          />
        </InputWrapper>
      </div>
    </div>
  );
};