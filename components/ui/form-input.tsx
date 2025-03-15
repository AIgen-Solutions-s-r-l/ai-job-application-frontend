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
        <label className="flex justify-start text-[14px] md:text-base leading-none mb-3 font-jura font-semibold">
          {title} {required && <span className="text-error ml-1">*</span>}
        </label>
        <input
          type={type}
          className={cn(
            "w-full h-10 bg-white outline-none border border-my-neutral-4 focus:border-primary-light-purple placeholder-shown:border-my-neutral-4 placeholder:text-base px-[10px] rounded-md text-[18px] font-jura",
            error && "placeholder-shown:border-error"
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-error mt-[2px] text-xs font-jura">{errorMessage}</p>}
      </div>
    )
  }
)
FormInput.displayName = "FormInput"

const InputWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col xl:flex-row gap-form p-10 rounded-[22px] bg-white">
    {children}
  </div>
}

export { FormInput, InputWrapper }
