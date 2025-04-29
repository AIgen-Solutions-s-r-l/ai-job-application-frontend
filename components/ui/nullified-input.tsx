import { cn } from "@/lib/utils"
import { forwardRef, InputHTMLAttributes, useEffect, useLayoutEffect, useRef } from "react";
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const NullifiedInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, value, defaultValue, ...props }, ref) => {
    const localRef = useRef<HTMLInputElement>(null)

    // Combine the forwarded ref (from register) with our local ref
    useEffect(() => {
      if (!ref) return
      
      if (typeof ref === 'function') {
        ref(localRef.current)
      } else {
        ref.current = localRef.current
      }
    }, [ref])

    // Initialize and set up event listener
    useLayoutEffect(() => {
      if (!localRef.current) return

      // Handle width adjustment
      const adjustWidth = () => {
        if (!localRef.current) return
        
        const span = document.createElement('span')
        span.style.visibility = 'hidden'
        span.style.position = 'absolute'
        span.style.whiteSpace = 'pre'
        span.style.font = window.getComputedStyle(localRef.current).font
        
        const text = localRef.current.value || localRef.current.placeholder || ''
        span.textContent = text
        
        document.body.appendChild(span)
        const width = span.getBoundingClientRect().width
        document.body.removeChild(span)
        
        localRef.current.style.width = `${Math.max(width, 4)}px`
      }
      
      adjustWidth()
      const input = localRef.current
      input.addEventListener('input', adjustWidth)
      
      return () => input.removeEventListener('input', adjustWidth)
    }, [value, defaultValue])

    return (
      <input
        type={type}
        ref={localRef}
        style={{ fontStyle: "inherit" }}
        className={cn(
          "border-b-2 border-transparent outline-none bg-transparent nullify-autocomplete",
          error && "placeholder-shown:border-error",
          className
        )}
        {...props}
      />
    )
  }
)

NullifiedInput.displayName = "NullifiedInput"

export { NullifiedInput }