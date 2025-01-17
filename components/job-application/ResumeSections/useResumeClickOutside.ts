import React, { useCallback, useEffect, useRef, useState } from "react";
import { useActiveSectionContext } from './active-section-context';

export function useResumeClickOutside(sectionId: string) {
  const { activeSection, setActiveSection } = useActiveSectionContext();
  const ref = useRef<HTMLDivElement | null>(null);
  const isActive = activeSection === sectionId;
  console.log('useResumeClickOutside', isActive, activeSection, sectionId);

  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const clickedElement = event.target as Node;
      const resumeSections = document.querySelector('#resume-sections');
      console.log('clickedElement', clickedElement);
      console.log('resumeSections', resumeSections);
      console.log('isActive', isActive, activeSection, sectionId);

      // Do nothing if clicking ref's element or descendent elements
      if (resumeSections && !resumeSections.contains(clickedElement)) {
        console.log('Do nothing if clicking refs element or descendent elements');
        return;
      }

      // If clicking outside the resume sections container
      if (resumeSections && !resumeSections.contains(clickedElement)) {
        console.log('If clicking outside the resume sections container');
        setActiveSection(null);
        return;
      }

      // Get all section elements
      const allSectionElements = Array.from(document.querySelectorAll('[data-section]'));
      const clickedInsideAnySection = allSectionElements.some(section => 
        section.contains(clickedElement)
      );

      // If clicked outside all sections but inside resume-sections
      if (!clickedInsideAnySection) {
        console.log('If clicked outside all sections but inside resume-sections');
        setActiveSection(null);
      }
    };

    console.log('addEventListener', sectionId);
    document.addEventListener('mousedown', handleGlobalClick);
    return () => {
      console.log('removeEventListener', sectionId);
      document.removeEventListener('mousedown', handleGlobalClick);
    };
  }, [setActiveSection]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('handleClick', sectionId);
    
    // If clicking the already active section, do nothing
    if (isActive) return;

    console.log('If clicking a new section, activate it', sectionId);
    // If clicking a new section, activate it
    setActiveSection(sectionId);
  }, [isActive, sectionId, setActiveSection]);

  return {
    ref,
    isActive,
    handleClick
  };
}

// hooks/useNestedClickOutside.ts
export function useNestedClickOutside<T extends number | string>(
  sectionId: string,
  initialIndex: T | null = null
) {
  const { activeSection } = useActiveSectionContext();
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
    // Reset active index when section becomes inactive
    if (activeSection !== sectionId) {
      setActiveIndex(null);
    }
  }, [activeSection, sectionId]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (activeSection !== sectionId) return;

      const clickedElement = event.target as Node;
      const activeEl = activeIndex !== null ? refsMap.current.get(activeIndex) : null;

      // If clicking outside all managed elements in this section
      const clickedInAnyRef = Array.from(refsMap.current.values()).some(
        el => el.contains(clickedElement)
      );

      if (!clickedInAnyRef) {
        setActiveIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [activeIndex, activeSection, sectionId]);

  return {
    setRef,
    activeIndex,
    setActiveIndex
  };
}