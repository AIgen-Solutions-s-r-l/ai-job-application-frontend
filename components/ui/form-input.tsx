import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    title: string;
    error?: boolean;
    errorMessage?: string;
    required?: boolean;
  }

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, title, error, errorMessage, required = true, ...props }, ref) => {
    return (
      <div className={className}>
        <label className="flex justify-start text-base leading-none mb-3">
          {title} { required && <span className="text-error ml-1">*</span>}
        </label>
        <input
          type={type}
          className={cn(
            "w-full h-10 bg-base-100 outline-none border-[1px] border-secondary focus:border-primary placeholder-shown:border-secondary placeholder:text-sm px-[10px] rounded-md text-base",
            error && "placeholder-shown:border-error" 
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-error mt-[2px] text-xs">{errorMessage}</p>}
      </div>
    )
  }
)
FormInput.displayName = "FormInput"

const InputWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="flex gap-form p-10 rounded-[22px] bg-base-100">
    {children}
  </div>
}

export { FormInput, InputWrapper }
