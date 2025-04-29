'use client';

import { renderBreadcrumbSchema } from "@/libs/seo"; // Adjust path if different
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import config from '@/config';
import { getGoogleOAuthURL, register as sendRegister } from '@/libs/api/auth'; // Importa la función register
import RequireLogout from '@/permissions/requireLogout';
import { VerifyEmailInstruction } from '@/components/VerifyEmailInstruction';
import { FormField } from '@/components/ui/FormField';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
};

const Signup = () => {
  const [registered, setRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const pswd = watch('password');

  const onSubmit = async (formValues: FormValues) => {
    setIsLoading(true);

    try {
      const { email, password } = formValues;
      const result = await sendRegister(email, password);

      if (result.success) {
        toast.success('Account created successfully! Please check your email to verify your account.');
        setRegistered(true);
      } else if (result.success == false) {
        toast.error(result.error || 'Failed to create account.');
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

  if (registered) {
    return <VerifyEmailInstruction />;
  }

  return (
    <>
    {renderBreadcrumbSchema([
      { name: "Automate your Job Applications", url: "https://laboro.co/" },
      { name: "Sign up to LABORO", url: "https://laboro.co/signup" },
    ])}
    <main className='auth-form-main' data-theme={config.colors.theme}>
      <div className='auth-form-container'>
        <div className='flex flex-col gap-2'>
          <Image src='/laboro.png' alt='Logo' width={214} height={58} />
          <h2 className='auth-form-header'>Create an account</h2>
        </div>

        <form className='auth-form-form' onSubmit={handleSubmit(onSubmit)}>
          <FormField error={errors.email?.message}>
            <input
              type='email'
              autoComplete='email'
              className='auth-form-input'
              placeholder='Enter your email'
              {...register('email', {
                required: 'Required field',
                pattern: {
                  value: /^[a-zA-Z0-9._-]{4,}@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]+$/,
                  message: 'Please enter a valid email',
                },
                // validate: (value: string) => {
                // const allowedDomains = [
                //   'gmail.com', 'yahoo.com', 'hotmail.com', 'aol.com', 'hotmail.co.uk', 
                //   'hotmail.fr', 'msn.com', 'yahoo.fr', 'wanadoo.fr', 'orange.fr', 
                //   'comcast.net', 'yahoo.co.uk', 'yahoo.com.br', 'yahoo.co.in', 
                //   'live.com', 'rediffmail.com', 'free.fr', 'gmx.de', 'web.de', 
                //   'yandex.ru', 'ymail.com', 'libero.it', 'outlook.com'
                // ];
                // const domain = value.split('@')[1];
                // return allowedDomains.includes(domain) || 'Please enter a valid email';
                // },
              })}
            />
          </FormField>
          <FormField error={errors.password?.message}>
            <input
              type='password'
              className='auth-form-input'
              placeholder='Create a password'
              {...register('password', {
                required: 'Required field',
                minLength: {
                  message: 'Minimum length 8 characters',
                  value: 8,
                },
                pattern: {
                  value: /^(?=.*\d).+$/,
                  message: 'Password must contain at least one number',
                },
              })}
            />
          </FormField>
          <FormField error={errors.confirmPassword?.message}>
            <input
              type='password'
              className='auth-form-input'
              placeholder='Confirm your password'
              {...register('confirmPassword', {
                required: 'Required field',
                validate: (value: string) =>
                  value === pswd || 'The passwords do not match',
              })}
            />
          </FormField>

          <FormField error={errors.termsAccepted?.message}>
            <label className="flex items-start gap-2 text-md text-gray-800">
              <input
                type="checkbox"
                {...register('termsAccepted', {
                  required: 'You must accept the terms and conditions',
                })}
                className="mt-1.5 scale-125 accent-primary"
              />
              <span>
                I agree to the{' '}
                <a href="https://drive.google.com/file/d/1GJZ2moJmJ8KBSrzVPcD9Slg6Kx_gTDSM/view" className="text-primary underline" target="_blank" rel="noopener noreferrer">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="https://drive.google.com/file/d/1M7AMuOOO6OAIXViYxY5gCVcnhYx6xQEB/view" className="text-primary underline" target="_blank" rel="noopener noreferrer">
                  Privacy & Cookie Policy
                </a>.
              </span>
            </label>
          </FormField>

          <button
            type='submit'
            className='auth-form-submit'
            disabled={isLoading}
          >
            {isLoading ? (
              <span className='loading loading-spinner loading-xs'></span>
            ) : (
              'Sign up'
            )}
          </button>
        </form>

        <div className="divider text-sm text-gray-500">OR</div>

        <button
          onClick={handleGoogleOauth}
          className="btn btn-outline w-full flex items-center justify-center gap-2"
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </>
          )}
        </button>

        <div className='auth-form-footer'>
          <p className='text-center'>
            If you are already a member, please{' '}
            <Link href={config.auth.loginUrl} className='text-primary'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
    </>
  );
};

export default RequireLogout(Signup);
