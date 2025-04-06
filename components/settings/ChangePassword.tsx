'use client';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { typography } from '@/components/typography';
import { FormInput } from '@/components/ui/form-input';
import { changePassword } from '@/libs/api/auth';

type FormData = {
  password: string;
  newPassword: string;
};

export const ChangePassword = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    defaultValues: {},
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await changePassword(data.password, data.newPassword);

      if (response.success) {
        toast.success('Link for change password sent to your current Email.');
      } else {
        toast.error('Error updating password.');
        console.error('Error updating password:', response.error);
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  return (
    <div className={typography.forms.container}>
      <div className={typography.forms.header.container}>
        <h2 className={typography.forms.header.mainText}>Change Password</h2>
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
            title={'New Password'}
            {...register('newPassword', {
              required: 'Password is required',
            })}
            type='password'
            error={!!errors.newPassword}
            errorMessage={errors.newPassword?.message}
            className='grow'
          />
          <button
            type='submit'
            className={typography.forms.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Confirming...' : 'Confirm'}
          </button>
        </div>
      </form>
    </div>
  );
};
