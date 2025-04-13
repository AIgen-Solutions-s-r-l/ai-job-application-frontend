import { FormInput, InputWrapper } from '@/components/ui/form-input';
import { JobProfile } from '@/libs/definitions';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

type FormData = Pick<JobProfile, "personalInfo">

export const PersonalInformationOnboarding: FC = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();

  return (
    <div className="">
      <div className="flex flex-col gap-5">
        {/* Name */}
        <InputWrapper>
          <FormInput
            title={'First Name'}
            {...register('personalInfo.name')}
            placeholder="e.g., John"
            error={!!errors.personalInfo?.name}
            errorMessage={errors.personalInfo?.name?.message}
            className='grow'
          />
          <FormInput
            title={'Last Name'}
            {...register('personalInfo.surname')}
            placeholder="e.g., Doe"
            error={!!errors.personalInfo?.surname}
            errorMessage={errors.personalInfo?.surname?.message}
            className='grow'
          />
          <FormInput
            title={'Date of Birth'}
            {...register('personalInfo.date_of_birth')}
            type="date"
            min="1980-01-01"
            max={new Date().toLocaleDateString('en-ca')}
            error={!!errors.personalInfo?.date_of_birth}
            errorMessage={errors.personalInfo?.date_of_birth?.message}
            className='w-[298px]'
          />
        </InputWrapper>

        {/* Address */}
        <InputWrapper>
          <FormInput
            title={'City'}
            {...register('personalInfo.city')}
            placeholder="e.g., New York"
            error={!!errors.personalInfo?.city}
            errorMessage={errors.personalInfo?.city?.message}
            className='w-[194px]'
          />
          <FormInput
            title={'Address'}
            {...register('personalInfo.address')}
            placeholder="e.g., 1234 Broadway St."
            error={!!errors.personalInfo?.address}
            errorMessage={errors.personalInfo?.address?.message}
            className='grow'
          />
          {/* <FormInput
            title={'State / Province'}
            // {...register('personalInfo.state')}
            placeholder="N/A"
            required={false}
            // error={!!errors.personalInfo?.state}
            // errorMessage={errors.personalInfo?.state?.message}
            className='w-[149px]'
          /> */}
          <FormInput
            title={'Zip / Postal'}
            {...register('personalInfo.zip_code')}
            placeholder="e.g., 10001"
            error={!!errors.personalInfo?.zip_code}
            errorMessage={errors.personalInfo?.zip_code?.message}
            className='w-[149px]'
          />
          <FormInput
            title={'Country'}
            {...register('personalInfo.country')}
            placeholder="e.g., USA"
            error={!!errors.personalInfo?.country}
            errorMessage={errors.personalInfo?.country?.message}
            className='w-[268px]'
          />
        </InputWrapper>

        {/* Contacts */}
        <InputWrapper>
          <FormInput
            title={'Phone prefix'}
            {...register('personalInfo.phone_prefix')}
            placeholder="e.g., +1"
            error={!!errors.personalInfo?.phone_prefix}
            errorMessage={errors.personalInfo?.phone_prefix?.message}
            className='w-[194px]'
          />
          <FormInput
            title={'Phone'}
            {...register('personalInfo.phone')}
            placeholder="e.g., 5551234567"
            error={!!errors.personalInfo?.phone}
            errorMessage={errors.personalInfo?.phone?.message}
            className='w-[186px]'
          />
          <FormInput
            title={'Email'}
            type='email'
            autoComplete='email'
            className='auth-form-input grow lg:w-[579px]'
            placeholder='e.g., john.doe@example.com'
            {...register('personalInfo.email', {
            required: 'Required field',
            pattern: {
              value: /^[a-zA-Z0-9._-]{4,}@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]+$/,
              message: 'Please enter a valid email',
            },
            validate: (value: string) => {
              const allowedDomains = [
              'gmail.com', 'yahoo.com', 'hotmail.com', 'aol.com', 'hotmail.co.uk', 
              'hotmail.fr', 'msn.com', 'yahoo.fr', 'wanadoo.fr', 'orange.fr', 
              'comcast.net', 'yahoo.co.uk', 'yahoo.com.br', 'yahoo.co.in', 
              'live.com', 'rediffmail.com', 'free.fr', 'gmx.de', 'web.de', 
              'yandex.ru', 'ymail.com', 'libero.it', 'outlook.com'
              ];
              const domain = value.split('@')[1];
              return allowedDomains.includes(domain) || 'Please enter a valid email domain';
            },
            })}
            />
          </InputWrapper>

        {/* Socials */}
        <InputWrapper>
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
            className='grow lg:w-[402px]'
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
            className='grow lg:w-[579px]'
          />
        </InputWrapper>
      </div>
    </div>
  );
};