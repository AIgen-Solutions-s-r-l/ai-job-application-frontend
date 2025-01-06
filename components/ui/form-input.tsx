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
        <label className="label flex justify-start text-base leading-none mb-2">{title} { required && <span className="text-error ml-1">*</span>}</label>
        <input
          type={type}
          className={cn(
            "w-full bg-base-100 outline-none border-[1px] border-secondary focus:border-primary placeholder-shown:border-secondary placeholder:text-sm h-10 px-[10px] py-3 rounded-md text-base",
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

export { FormInput }
