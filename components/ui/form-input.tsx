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
      <div>
        <label className="label flex justify-start text-md leading-none mb-2">{title} { required && <span className="text-error ml-1">*</span>}</label>
        <input
          type={type}
          className={cn(
            "bg-base-200 outline-none border-[1px] border-transparent focus:border-primary placeholder-shown:border-neutral-content h-12 px-[10px] py-3 rounded-sm text-md",
            error && "placeholder-shown:border-error", 
            className
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
