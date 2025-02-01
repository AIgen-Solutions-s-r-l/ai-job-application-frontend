import React, { createContext, useContext, useState } from "react"

type TemplateFocusProviderProps = {
  children: React.ReactNode
}

type TemplateFocusContextType = {
  hasFocus: boolean,
  setHasFocus: React.Dispatch<React.SetStateAction<boolean>>
}

const TemplateFocusContext = createContext<TemplateFocusContextType | null>(null);

export default function TemplateFocusProvider({ children }:  TemplateFocusProviderProps) {
  const [hasFocus, setHasFocus] = useState<boolean>(false);

  return (
    <TemplateFocusContext.Provider value={{ hasFocus, setHasFocus }}>
      {children}
    </TemplateFocusContext.Provider>
  );
}

export function useTemplateFocusContext() {
  const context = useContext(TemplateFocusContext);
  if (!context) {
    throw new Error("useTemplateFocusContext must be used within a TemplateFocusProvider");
  }
  return context;
}