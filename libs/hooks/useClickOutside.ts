import { RefObject, useEffect, useRef, useState } from "react";

// For single element click outside detection
export function useClickOutside(initialState = false) {
  const [isActive, setIsActive] = useState(initialState);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const el = ref?.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      setIsActive(false);
    }

    document.addEventListener("mousedown", handleClick, true);
    return () => {
      document.removeEventListener("mousedown", handleClick, true);
    };
  }, []);

  return {
    ref,
    isActive,
    setIsActive,
  };
}

// For handling multiple nested elements
export function useNestedClickOutside<T extends number | string>(
  initialIndex: T | null = null
) {
  const [activeIndex, setActiveIndex] = useState<T | null>(initialIndex);
  const refsMap = useRef<Map<T, HTMLDivElement>>(new Map());

  const setRef = (index: T, element: HTMLDivElement | null) => {
    if (element) {
      refsMap.current.set(index, element);
    } else {
      refsMap.current.delete(index);
    }
  };

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (activeIndex === null) return;

      const activeEl = refsMap.current.get(activeIndex);
      
      // Check if click target is outside the active element
      if (!activeEl || !activeEl.contains(event.target as Node)) {
        // Also check if the click is not within any other managed elements
        const clickedInAnotherRef = Array.from(refsMap.current.values()).some(
          (el) => el.contains(event.target as Node)
        );
        
        if (!clickedInAnotherRef) {
          setActiveIndex(null);
        }
      }
    }

    // Use mousedown instead of click for better interaction with focus events
    document.addEventListener("mousedown", handleClick, true);
    return () => {
      document.removeEventListener("mousedown", handleClick, true);
    };
  }, [activeIndex]);

  return {
    refs: refsMap,
    setRef,
    activeIndex,
    setActiveIndex,
  };
}

// Optional: Helper type for components using nested click outside
export interface ClickOutsideProps {
  isActive: boolean;
  onClick: () => void;
  ref: RefObject<HTMLDivElement>;
}