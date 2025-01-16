import { useEffect, useRef } from "react";

export function useClickOutside(callback: () => void) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const el = ref?.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      callback();
    }

    window?.addEventListener("click", handleClick, { capture: true });
    return () => {
      window?.removeEventListener("click", handleClick, { capture: true });
    };
  }, [callback, ref.current]);

  return ref;
}

export function useNestedClickOutside(callback: (index: number) => void) {
  const refs = useRef<Map<number, HTMLDivElement>>(new Map());
  
  const setRef = (index: number, element: HTMLDivElement | null) => {
    if (element) {
      refs.current.set(index, element);
    } else {
      refs.current.delete(index);
    }
  };

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      // Check each ref in the Map
      refs.current.forEach((el, index) => {
        // If clicking outside of this specific element
        if (!el.contains(event.target as Node)) {
          callback(index);
        }
      });
    }

    window?.addEventListener("click", handleClick, { capture: true });
    return () => {
      window?.removeEventListener("click", handleClick, { capture: true });
    };
  }, [callback]);

  return setRef;
}