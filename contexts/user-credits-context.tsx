import { fetchBalanceData } from "@/libs/data";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

type UserCreditsProviderProps = {
  children: ReactNode;
}

type UserCreditsContextType = {
  credits: number;
  setCredits: Dispatch<SetStateAction<number>>;
  updateCredits: () => Promise<void>;
}

const UserCreditsContext = createContext<UserCreditsContextType | null>(null);

export default function UserCreditsProvider({ children }: UserCreditsProviderProps) {
  const [credits, setCredits] = useState<number>(0);

  const getCredits = async () => {
    try {
      const result = await fetchBalanceData();

      if (result.success === false) {
        throw new Error(result.error);
      }

      setCredits(parseInt(result.value?.toString() ?? '0'));
    } catch (error) {
      console.error("Error fetching credits:", error instanceof Error ? error.message : error);
    }
  }

  const updateCredits = async () => {
    getCredits();
  }

  useEffect(() => {
    getCredits();
  });

  const contextValue = {
    credits,
    setCredits,
    updateCredits,
  };

  return (
    <UserCreditsContext.Provider value={contextValue}>
      {children}
    </UserCreditsContext.Provider>
  )
}

export function useUserCreditsContext() {
  const context = useContext(UserCreditsContext);
  if (!context) {
    throw new Error("useUserCreditsContext must be used within a UserCreditsProvider");
  }
  return context;
}