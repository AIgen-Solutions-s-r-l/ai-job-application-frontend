'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation'; // Importa el router
import config from '@/config';
import Image from 'next/image';
import { fetchUserData, register, resendVerification } from '@/libs/api/auth'; // Importa la función register
import RequireLogout from '@/permissions/requireLogout';
import { useUserContext } from '@/contexts/user-context';
import { isResumeExits } from '@/libs/api/resume';
import { useForm } from 'react-hook-form';
import { FormField } from '@/components/ui/FormField';

type FormValues = {
  email: string;
};

const ResendVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const token = params.token;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async ({ email }: FormValues) => {
    setIsLoading(true);

    try {
      const result = await resendVerification(email);
      console.log({ result });

      if (result.success) {
        toast.success(result.value || 'Request in successfully!');
      } else if (result.success == false) {
        toast.error(result.error || 'Failed to send request');
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
      <div className='auth-form-container'>
        <div className='flex flex-col gap-2'>
          <Image src='/laboro.png' alt='Logo' width={214} height={58} />
          <h2 className='auth-form-header'>Activate an account</h2>

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
            
            <button
              type='submit'
              className='auth-form-submit'
              disabled={isLoading}
            >
              {isLoading ? (
                <span className='loading loading-spinner loading-xs'></span>
              ) : (
                'Re-send link for activate'
              )}
            </button>
          </form>

          <div className='auth-form-footer'>
            <p>
              If you are already a member, please{' '}
              <Link href='/signin' className='text-primary'>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResendVerification;
