'use client';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { typography } from '@/components/typography';
import { FormInput } from '@/components/ui/form-input';
import { changePassword } from '@/libs/api/auth';
import { useUserContext } from '@/contexts/user-context'; // Import user context hook
import { Alert } from '@/components/Alert'; // Import the custom Alert component
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type FormData = {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
};

export const ChangePassword = () => {
  const { user } = useUserContext(); // Get user from context
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {},
  });

  const onSubmit = async (data: FormData) => {
    try {

      if (data.password === data.newPassword) {
        toast.error('New password and current password must differ.');
        console.error('Error updating password: New password and current password must differ.');
        return;
      }

      const response = await changePassword(data.password, data.newPassword);

      if (response.success) {
        toast.success('Password changed successfully.');
        setTimeout(() => { router.replace('/logout'); }, 2000);
      } else {
        toast.error('Error updating password.');
        console.error('Error updating password:', response.error);
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const isGoogleAuth = user?.auth_type === 'google';

  return (
    <div className={typography.forms.container}>
      <div className={typography.forms.header.container}>
        <h2 className={typography.forms.header.mainText}>Change Password</h2>
      </div>

      {isGoogleAuth ? (
        <Alert>
          <h4 className='font-semibold mb-2'>Account Managed by Google</h4>
          <p className='text-sm'>
            Your password is managed through your linked Google account. To
            change your password, please update it in your Google account settings.
          </p>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={typography.forms.row}>
            <FormInput
              title={'Current Password'}
              {...register('password', {
                required: 'Current Password is required',
              })}
              type='password'
              autoComplete='current-password'
              error={!!errors.password}
              errorMessage={errors.password?.message}
              className='grow'
            />
            <FormInput
                title={'New Password'}
                {...register('newPassword', {
                required: 'New Password is required',
                pattern: {
                  value: /^(?=.*\d).{8,}$/,
                  message: 'Password must be at least 8 characters long and contain at least one number',
                },
                })}
                type='password'
                autoComplete='new-password'
              error={!!errors.newPassword}
                errorMessage={errors.newPassword?.message}
                className='grow'
                />
                <FormInput
                title={'Confirm New Password'}
                {...register('newPasswordConfirm', {
                  required: 'Confirm Password is required',
                })}
                type='password'
                error={!!errors.newPasswordConfirm}
                errorMessage={
                  watch('newPasswordConfirm') !== watch('newPassword')
                  ? 'The passwords do not match'
                  : undefined
                }
                className='grow'
                onChange={() => {
                  if (watch('newPasswordConfirm') === watch('newPassword')) {
                  errors.newPasswordConfirm = undefined;
                  }
                }}
                />
          </div>
            <div className="flex justify-between pt-4">
              <Link href='/forgot-password' className='font-medium text-primary hover:underline'>
                Forgot password?
              </Link>

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
