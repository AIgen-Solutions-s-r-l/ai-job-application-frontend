'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import config from '@/config';
import { fetchUserData, login } from '@/libs/api/auth'; // Importa la función de login
import { isResumeExits } from '@/libs/api/resume';
import RequireLogout from '@/permissions/requireLogout';
import { useUserContext } from '@/contexts/user-context';
import { FormField } from '@/components/ui/FormField';

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUser } = useUserContext();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async ({ email, password }: FormValues) => {
    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success && result.value?.access_token) {
        toast.success('Logged in successfully!');
        try {
          const [exists, me] = await Promise.all([
            isResumeExits(),
            fetchUserData(),
          ]);

          setUser({ ...exists, ...me });
          router.replace(exists.exists ? '/dashboard' : '/onboarding');
        } catch (error) {
          router.replace('/onboarding');
        }
      } else if (result.success == false) {
        toast.error(result.error || 'Failed to login.');
      } else {
        throw new Error('Access token not received.');
      }
    } catch (error: any) {
      console.error(error);
      toast.error('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='auth-form-main' data-theme={config.colors.theme}>
      <div className='absolute top-4 left-4'>
        <Link
          href='/'
          className='btn btn-ghost btn-sm flex items-center space-x-1'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
            />
          </svg>
          <span>Back to Home</span>
        </Link>
      </div>

      <div className='auth-form-container'>
        <div className='flex flex-col gap-2'>
          <Image src='/laboro.png' alt='Logo' width={214} height={58} />
          <h2 className='auth-form-header'>Login to your Account</h2>
        </div>

        <form className='auth-form-form' onSubmit={handleSubmit(onSubmit)}>
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
          <FormField error={errors.password?.message}>
            <input
              type='password'
              className='auth-form-input'
              placeholder='Password'
              {...register('password', {
                required: 'Required field',
                minLength: {
                  message: 'Minimum length 8 characters',
                  value: 8,
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
              'Sign in'
            )}
          </button>
        </form>

        <div className='auth-form-footer'>
          <div className='flex justify-between text-xs md:text-sm'>
            <Link href='/forgot-password' className='font-medium text-primary'>
              Forgot password?
            </Link>
            <p className='text-center'>
              Don’t have an account?{' '}
              <Link href='/signup' className='text-primary'>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RequireLogout(Login);
