'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isResumeExits } from '@/libs/api/resume';

interface User {
    exists: boolean;
}

type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export default function UserContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const getUserData = async () => {
        try {
            const exists = await isResumeExits();
            setUser(exists);
        } catch (error) {
            console.error('Error fetching resume existence:', error);
            setUser(null);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
}