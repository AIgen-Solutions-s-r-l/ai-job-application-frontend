import { cn } from "@/lib/utils";
import {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const NullifiedInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, value, defaultValue, ...props }, ref) => {
    const localRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Combine forwarded ref with local ref
    useEffect(() => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(localRef.current);
      } else {
        ref.current = localRef.current;
      }
    }, [ref]);

    // Adjust width based on content and show loading
    useEffect(() => {
      if (!localRef.current) return;

      const adjustWidth = () => {
        if (!localRef.current) return;

        setIsLoading(true);

        const span = document.createElement("span");
        span.style.visibility = "hidden";
        span.style.position = "absolute";
        span.style.whiteSpace = "pre";
        span.style.font = window.getComputedStyle(localRef.current).font;

        const text = localRef.current.value || localRef.current.placeholder || "";
        span.textContent = text;

        document.body.appendChild(span);
        const width = span.getBoundingClientRect().width;
        document.body.removeChild(span);

        localRef.current.style.width = `${Math.max(width, 4)}px`;
        setIsLoading(false);
      };

      adjustWidth();
      const input = localRef.current;
      input.addEventListener("input", adjustWidth);

      return () => input.removeEventListener("input", adjustWidth);
    }, [value, defaultValue]);

    return (
      <div className="relative inline-block">
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
        {isLoading && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 animate-spin w-3 h-3 border-2 border-t-transparent border-gray-400 rounded-full" />
        )}
      </div>
    );
  }
);

NullifiedInput.displayName = "NullifiedInput";

export { NullifiedInput };
