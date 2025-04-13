'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import config from '@/config';
import { resetPasswordForEmail } from '@/libs/api/auth';
import { FormField } from '@/components/ui/FormField';

type FormValues = {
  email: string;
};

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async ({ email }: FormValues) => {
    setIsLoading(true);

    try {
      const response = await resetPasswordForEmail(email);
      if (response.success) {
        toast.success('Password reset email sent! Check your inbox.');
        setIsEmailSent(true);
      } else {
        toast.error(`Failed to send password reset email: ${response.error}`);
        console.error('Failed to send password reset email.:', response.error);
      }
    } catch (error) {
      console.error('Unexpected error occured during password reset:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='auth-form-main' data-theme={config.colors.theme}>
      <div className='auth-form-container'>
        <div className='flex flex-col'>
          <Image src='/laboro.png' alt='Logo' width={214} height={58} />
          <h2 className='auth-form-header'>Reset your password</h2>

          {isEmailSent ? (
            <p className='text-sm text-gray-600 mb-4'>
              Password reset email was sent yo your inbox! Follow the
              instructions to reset your password.
            </p>
          ) : (
            <p className='text-sm text-gray-600'>
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </p>
          )}
        </div>

        {!isEmailSent && (
          <form
            className='space-y-4 font-jura'
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField error={errors.email?.message}>
              <input
                type='email'
                autoComplete='email'
                className='auth-form-input'
                placeholder='Email address'
                {...register('email', {
                  required: 'Required field',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                    message: 'Please enter a valid email',
                  },
                })}
              />
            </FormField>

            <button
              type='submit'
              className='auth-form-submit'
              disabled={isLoading}
            >
              {isLoading ? (
                <span className='loading loading-spinner loading-xs'></span>
              ) : (
                'Send reset link'
              )}
            </button>
          </form>
        )}

        <div className='auth-form-footer'>
          <p className=''>
            Remember your password?{' '}
            <Link href={config.auth.loginUrl} className='text-primary'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
