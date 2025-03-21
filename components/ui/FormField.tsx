import { Children, ReactElement } from 'react';

interface FieldProps {
  label?: string;
  toTheRightLabel?: ReactElement;
  htmlFor?: string;
  error?: any;
  children: ReactElement;
}

export const FormField = ({ label, htmlFor, error, children }: FieldProps) => {
  const id = htmlFor || getChildId(children);

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

function getChildId(children: ReactElement) {
  const child = Children.only(children);

  if ('id' in child?.props) {
    return child.props.id;
  }
}
