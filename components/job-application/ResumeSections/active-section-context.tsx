import React, { createContext, useContext, useState } from 'react';

interface ActiveSectionContextType {
  activeSection: string | null;
  setActiveSection: (sectionId: string | null) => void;
}

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined);

export const ActiveSectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

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