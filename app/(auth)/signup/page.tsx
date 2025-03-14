'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import config from '@/config';
import { register as sendRegister } from '@/libs/api/auth'; // Importa la función register
import RequireLogout from '@/permissions/requireLogout';
import { VerifyEmailInstruction } from '@/components/VerifyEmailInstruction';
import { FormField } from '@/components/ui/FormField';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const [registered, setRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
        toast.success('Logged in successfully!');
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

  if (registered) {
    return <VerifyEmailInstruction />;
  }

  return (
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
              placeholder='Create a password'
              {...register('password', {
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
              placeholder='Confirm your password'
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
              'Sign up'
            )}
          </button>
        </form>

        <div className='auth-form-footer'>
          <p className='text-center'>
            If you are already a member, please{' '}
            <Link href='/signin' className='text-primary'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default RequireLogout(Signup);
