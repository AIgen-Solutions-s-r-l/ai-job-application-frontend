'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  JSX,
  Dispatch,
  SetStateAction,
} from 'react';

type SidenavContextType = {
  slots: Record<string, JSX.Element>;
  setSlots: Dispatch<SetStateAction<Record<string, JSX.Element>>>;
};

const SidenavContext = createContext<SidenavContextType | null>(null);

export default function SidenavContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [slots, setSlots] = useState<Record<string, JSX.Element>>({});

  return (
    <SidenavContext.Provider value={{ slots, setSlots }}>
      {children}
    </SidenavContext.Provider>
  );
}

export function useSidenavContext() {
  const context = useContext(SidenavContext);
  if (!context) {
    throw new Error(
      'useSidenavContext must be used within a SidenavContextProvider'
    );
  }
  return context;
}
