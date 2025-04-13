'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import config from '@/config';
import { resetPassword } from '@/libs/api/auth';
import { FormField } from '@/components/ui/FormField';

type FormValues = {
  newPassword: string;
  confirmPassword: string;
};

export default function UpdatePassword({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const router = useRouter();
  const token = searchParams.token;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const pswd = watch('newPassword');

  useEffect(() => {
    if (!token) {
      router.replace('/forgot-password');
    }
  });

  const onSubmit = async ({ newPassword }: FormValues) => {
    setIsLoading(true);

    try {
      const response = await resetPassword(newPassword, token);
      if (response.success) {
        toast.success(
          'Password updated successfully! Please log in with your new password.'
        );
        router.replace(config.auth.loginUrl);
      } else {
        toast.error(`Failed to update password: ${response.error}`);
        console.error('Failed to update password.:', response.error);
        setHasError(true);
      }
    } catch (error) {
      console.error('Unexpected error occured during password update:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='auth-form-main' data-theme={config.colors.theme}>
      <div className='auth-form-container'>
        <div className='flex flex-col'>
          <Image src='/laboro.png' alt='Logo' width={214} height={58} />
          <h2 className='auth-form-header'>Set a new password</h2>
          <p className='text-sm text-gray-600'>
            Enter your new password below to update your account.
          </p>
        </div>

        <form className='space-y-4 font-jura' onSubmit={handleSubmit(onSubmit)}>
          <FormField error={errors.newPassword?.message}>
            <input
              type='password'
              className='auth-form-input'
              placeholder='New password'
              {...register('newPassword', {
                required: 'Required field',
                minLength: {
                  message: 'Minimum length 8 characters',
                  value: 8,
                },
              })}
            />
          </FormField>
          <FormField error={errors.confirmPassword?.message}>
            <input
              type='password'
              className='auth-form-input'
              placeholder='Confirm new password'
              {...register('confirmPassword', {
                required: 'Required field',
                validate: (value: string) =>
                  value === pswd || 'The passwords do not match',
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
              'Update password'
            )}
          </button>

          {hasError && (
            <Link href='/forgot-password' className='btn btn-secondary w-full'>
              Send new email
            </Link>
          )}
        </form>

        <div className='auth-form-footer'>
          <p className=''>
            Remembered your password?{' '}
            <a href={config.auth.loginUrl} className='text-primary'>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
