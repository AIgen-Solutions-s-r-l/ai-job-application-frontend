'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { typography } from '@/components/typography';
import { FormInput } from '@/components/ui/form-input';
import { changeEmail } from '@/libs/api/auth';

type FormData = {
  name: string;
  password: string;
  newEmail: string;
};

export const ChangeEmail: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    defaultValues: {},
  });

  const onSubmit = async (data: FormData) => {
    try {
      const username = localStorage.getItem('username');
      const response = await changeEmail(
        username,
        data.password,
        data.newEmail
      );

      if (response.success) {
        toast.success('Email updated successfully!');
      } else {
        toast.error('Error updating email.');
        console.error('Error updating email:', response.error);
      }
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  return (
    <div className={typography.forms.container}>
      <div className={typography.forms.header.container}>
        <h2 className={typography.forms.header.mainText}>Change Email</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={typography.forms.row}>
          <FormInput
            title={'Current Password'}
            {...register('password', {
              required: 'Password is required',
            })}
            type='password'
            error={!!errors.password}
            errorMessage={errors.password?.message}
            className='grow'
          />
          <FormInput
            title={'New Email'}
            {...register('newEmail', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9.]{4,}@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]+$/,
                message: 'Invalid email address',
              },
            })}
            type='email'
            placeholder='e.g., john.doe@example.com'
            error={!!errors.newEmail}
            errorMessage={errors.newEmail?.message}
            className='grow'
          />
          <button
            type='submit'
            className={typography.forms.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};
