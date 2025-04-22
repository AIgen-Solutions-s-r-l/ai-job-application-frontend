import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
  }

const NullifiedInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        style={{ fontStyle: "inherit" }}
        className={cn(
          "field-sizing-content min-w-4 border-b-2 border-transparent outline-none bg-transparent nullify-autocomplete",
          error && "placeholder-shown:border-error",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
NullifiedInput.displayName = "NullifiedInput"

export { NullifiedInput }
