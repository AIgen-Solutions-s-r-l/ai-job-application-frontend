import React, { createContext, useContext, useEffect, useState } from 'react';

interface ActiveSectionContextType {
  activeSection: string | null;
  setActiveSection: (sectionId: string | null) => void;
}

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined);

export const ActiveSectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  useEffect(() => {
    console.log('activeSectionuseEffect', activeSection);
    const handleGlobalClick = (event: MouseEvent) => {
      const clickedElement = event.target as Node;
      const resumeSections = document.querySelector('#resume-sections');
      console.log('clickedElement', clickedElement);

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
      console.log('allSectionElements', allSectionElements);
      console.log('clickedInsideAnySection', clickedInsideAnySection);

      // If clicked outside all sections but inside resume-sections
      if (!clickedInsideAnySection) {
        console.log('If clicked outside all sections but inside resume-sections');
        setActiveSection(null);
      }
    };

    console.log('addEventListener');
    document.addEventListener('mousedown', handleGlobalClick);
    return () => {
      console.log('removeEventListener');
      document.removeEventListener('mousedown', handleGlobalClick);
    };
  });

  const value = { activeSection, setActiveSection };

  return (
    <ActiveSectionContext.Provider value={value}>
      {children}
    </ActiveSectionContext.Provider>
  );
};

export const useActiveSectionContext = () => {
  const context = useContext(ActiveSectionContext);
  if (context === undefined) {
    throw new Error('useActiveSectionContext must be used within an ActiveSectionProvider');
  }
  return context;
};