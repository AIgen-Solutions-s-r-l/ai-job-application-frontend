// contexts/SectionFocusContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FocusState {
  sectionId: string | null;
  nestedIndex: number | null;
}

interface SectionFocusContextType {
  focusState: FocusState;
  setFocusState: (state: FocusState) => void;
}

const SectionFocusContext = createContext<SectionFocusContextType | undefined>(undefined);

export const SectionFocusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [focusState, setFocusState] = useState<FocusState>({ 
    sectionId: null, 
    nestedIndex: null 
  });

  return (
    <SectionFocusContext.Provider value={{ focusState, setFocusState }}>
      {children}
    </SectionFocusContext.Provider>
  );
};

// Hook for nested sections (like Experience, Education, etc.)
export function useNestedSectionFocus(sectionId: string) {
  const context = useContext(SectionFocusContext);
  if (!context) {
    throw new Error('useNestedSectionFocus must be used within a SectionFocusProvider');
  }

  const { focusState, setFocusState } = context;
  const refsMap = React.useRef<Map<number, HTMLDivElement>>(new Map());

  const setRef = (index: number, element: HTMLDivElement | null) => {
    if (element) {
      refsMap.current.set(index, element);
    } else {
      refsMap.current.delete(index);
    }
  };

  React.useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (focusState.sectionId !== sectionId) return;

      const activeEl = focusState.nestedIndex !== null 
        ? refsMap.current.get(focusState.nestedIndex) 
        : null;

      if (!activeEl || !activeEl.contains(event.target as Node)) {
        const clickedInAnotherRef = Array.from(refsMap.current.values()).some(
          (el) => el.contains(event.target as Node)
        );

        if (!clickedInAnotherRef) {
          const clickedAnotherSection = Array.from(
            document.querySelectorAll('[data-section-id]')
          ).some(el => el.contains(event.target as Node));

          if (!clickedAnotherSection) {
            setFocusState({ sectionId: null, nestedIndex: null });
          }
        }
      }
    }

    document.addEventListener("mousedown", handleClick, true);
    return () => {
      document.removeEventListener("mousedown", handleClick, true);
    };
  }, [focusState, sectionId, setFocusState]);

  return {
    setRef,
    activeIndex: focusState.sectionId === sectionId ? focusState.nestedIndex : null,
    setActiveIndex: (index: number | null) => {
      setFocusState({ sectionId, nestedIndex: index });
    },
    isActive: focusState.sectionId === sectionId
  };
}

// Hook for single sections (like Personal Info)
export function useSectionFocus(sectionId: string) {
  const context = useContext(SectionFocusContext);
  if (!context) {
    throw new Error('useSectionFocus must be used within a SectionFocusProvider');
  }

  const { focusState, setFocusState } = context;
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function handleClick(event: MouseEvent) {
      const el = ref?.current;
      
      if (!el || !el.contains(event.target as Node)) {
        const clickedAnotherSection = Array.from(
          document.querySelectorAll('[data-section-id]')
        ).some(el => el.contains(event.target as Node));

        if (!clickedAnotherSection) {
          setFocusState({ sectionId: null, nestedIndex: null });
        }
      }
    }

    document.addEventListener("mousedown", handleClick, true);
    return () => {
      document.removeEventListener("mousedown", handleClick, true);
    };
  }, [setFocusState]);

  return {
    ref,
    isActive: focusState.sectionId === sectionId,
    setActive: () => setFocusState({ sectionId, nestedIndex: null })
  };
}