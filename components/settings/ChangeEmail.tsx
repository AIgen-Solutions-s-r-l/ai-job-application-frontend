'use client';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { typography } from '@/components/typography';
import { FormInput } from '@/components/ui/form-input';
import { changeEmail, fetchUserData } from '@/libs/api/auth';
import { useUserContext } from '@/contexts/user-context'; // Import user context hook
import { Alert } from '@/components/Alert'; // Import the custom Alert component
type FormData = {
  name: string;
  password: string;
  newEmail: string;
};

export const ChangeEmail = () => {
  const router = useRouter();
  const { user } = useUserContext(); // Get user from context
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    defaultValues: {},
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { email } = await fetchUserData();

      if (email === data.newEmail) {
        toast.error('New email and current email must differ.');
        console.error('Error updating email: New email must differ from current email.');
        return;
      }

      const response = await changeEmail(
        data.password,
        data.newEmail
      );

      if (response.success) {
        toast.success('Link for change email sent to your current Email.');
        router.replace('/logout');
      } else {
        toast.error('Error updating email.');
        console.error('Error updating email:', response.error);
      }
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  const isGoogleAuth = user?.auth_type === 'google';

  return (
    <div className={typography.forms.container}>
      <div className={typography.forms.header.container}>
        <h2 className={typography.forms.header.mainText}>Change Email</h2>
      </div>

      {isGoogleAuth ? (
        <Alert>
          <h4 className='font-semibold mb-2'>Account Managed by Google</h4>
          <p className='text-sm'>
            Your email address is managed through your linked Google account. To
            change your email, please update it in your Google account settings.
          </p>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={typography.forms.row}>
            <FormInput
              title={'Current Password'}
              {...register('password', {
                required: 'Password is required',
              })}
              type='password'
              autoComplete='current-password'
              error={!!errors.password}
              errorMessage={errors.password?.message}
              className='grow'
            />
            <FormInput
              title={'New Email'}
              {...register('newEmail', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._-]{4,}@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]+$/,
                  message: 'Invalid email address',
                },
              })}
              type='email'
              autoComplete='email'
              placeholder='e.g., john.doe@example.com'
              error={!!errors.newEmail}
              errorMessage={errors.newEmail?.message}
              className='grow'
            />
          </div>
            <div className="flex justify-end pt-4">
              <button
                type='submit'
                className={typography.forms.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Confirming...' : 'Confirm'}
              </button>
            </div>
        </form>
      )}
    </div>
  );
};
