'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import config from '@/config';
import { fetchUserData, getGoogleOAuthURL, login } from '@/libs/api/auth'; // Importa la función de login
import { isResumeExits } from '@/libs/api/resume';
import RequireLogout from '@/permissions/requireLogout';
import { useUserContext } from '@/contexts/user-context';
import { FormField } from '@/components/ui/FormField';

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [emailMotVerified, setEmailMotVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const { setUser, setAccessToken } = useUserContext();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async ({ email, password }: FormValues) => {
    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success && result.value?.access_token) {
        toast.success('Login successful!');
        try {
          const [exists, me] = await Promise.all([
            isResumeExits(),
            fetchUserData(),
          ]);

          setUser({ ...exists, ...me });
          setAccessToken(result.value.access_token);
          router.replace(exists.exists ? '/search' : '/onboarding');
        } catch (error) {
          router.replace('/onboarding');
        }
      } else if (result.success == false) {
        if (
          result.error ===
          'Error 403: Email not verified. Please check your email for verification instructions.'
        ) {
          setEmailMotVerified(true);
          toast.error(
            'Account verification pending. Check your email for the verification link or request a new one.'
          );
        } else {
          toast.error(result.error || 'Failed to login.');
        }
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

  const handleGoogleOauth = async () => {
    setIsGoogleLoading(true);
    try {
      // Use the environment variable for redirect URI
      const result = await getGoogleOAuthURL();
      
      if (result.success && result.value) {
        // Redirect to the Google authorization URL
        window.location.href = result.value as string;
      } else {
        // Type assertion to access the error property
        const errorResult = result as { success: false; error: string };
        toast.error(errorResult.error || 'Failed to initiate Google authentication');
      }
    } catch (error: any) {
      console.error('Error starting Google authentication:', error);
      toast.error(error.message || 'Error starting Google authentication');
    } finally {
      setIsGoogleLoading(false);
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

        <div className='divider text-sm text-gray-500'>OR</div>

        <button
          onClick={handleGoogleOauth}
          className='btn btn-outline w-full flex items-center justify-center gap-2'
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? (
            <span className='loading loading-spinner loading-xs'></span>
          ) : (
            <>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
              >
                <path
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  fill='#4285F4'
                />
                <path
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  fill='#34A853'
                />
                <path
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  fill='#FBBC05'
                />
                <path
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  fill='#EA4335'
                />
              </svg>
              Continue with Google
            </>
          )}
        </button>

        <div className='auth-form-footer'>
          {emailMotVerified && (
            <Link
              href='/resend-verification'
              className='font-medium text-primary'
            >
              Re-send link for activate email
            </Link>
          )}
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
