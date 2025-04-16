import { ReactElement } from 'react';

interface FieldProps {
  label?: string;
  toTheRightLabel?: ReactElement;
  htmlFor?: string;
  error?: any;
  children: ReactElement;
}

export const FormField = ({ error, children }: FieldProps) => {
  // const id = htmlFor || getChildId(children);

  return (
    <div className='form-control'>
      {children}
      {error && (
        <span role='alert' className='text-red-600'>
          {String(error)}
        </span>
      )}
    </div>
  );
};

