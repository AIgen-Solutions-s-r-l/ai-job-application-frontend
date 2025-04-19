import { FormInput, InputWrapper } from '@/components/ui/form-input';
import { JobProfile } from '@/libs/definitions';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

type FormData = Pick<JobProfile, "personalInfo">

export const ProfilePersonalInformation: FC = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();

  return (
    <div className="collapse collapse-arrow group rounded-none">
      <input type="checkbox" name="my-accordion-2" defaultChecked />
      <div className="collapse-title !pl-5 text-base md:text-lg lg:text-xl font-montserrat font-medium bg-my-neutral-2 group-has-[input:checked]:bg-base-100">Personal Information
        {errors.personalInfo && <p className="text-error text-xs lg:text-sm">Please fill out all required fields</p>}
      </div>
      <div className="collapse-content !p-0 bg-base-100">
        <div className="w-full flex flex-col gap-5 mb-5">
          {/* Name */}
          <InputWrapper profile>
            <FormInput
              title={'First Name'}
              {...register('personalInfo.name', { required: 'First Name is required' })}
              placeholder="e.g., John"
              error={!!errors.personalInfo?.name}
              errorMessage={errors.personalInfo?.name?.message}
              className='grow'
            />
            <FormInput
              title={'Last Name'}
              {...register('personalInfo.surname', { required: 'Last Name is required' })}
              placeholder="e.g., Doe"
              error={!!errors.personalInfo?.surname}
              errorMessage={errors.personalInfo?.surname?.message}
              className='grow'
            />
            <FormInput
              title={'Date of Birth'}
              {...register('personalInfo.date_of_birth', { required: 'Date of Birth is required' })}
              type="date"
              min="1980-01-01"
              max={new Date().toLocaleDateString('en-ca')}
              error={!!errors.personalInfo?.date_of_birth}
              errorMessage={errors.personalInfo?.date_of_birth?.message}
              className='w-[298px]'
            />
          </InputWrapper>

          <InputWrapper profile>
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
              className='grow'
            />
            <FormInput
              title={'Zip / Postal'}
              {...register('personalInfo.zip_code', { required: 'Zip / Postal is required' })}
              placeholder="e.g., 10001"
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
          </InputWrapper>

          <InputWrapper profile>
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
                  value: /^[a-zA-Z0-9._-]{4,}@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]+$/,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              placeholder="e.g., john.doe@example.com"
              error={!!errors.personalInfo?.email}
              errorMessage={errors.personalInfo?.email?.message}
              className='grow'
            />
          </InputWrapper>

          <InputWrapper profile>
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
              className='grow'
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
              className='grow'
            />
          </InputWrapper>
        </div>
      </div>
    </div>
  );
};