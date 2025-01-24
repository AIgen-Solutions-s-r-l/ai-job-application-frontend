'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isResumeExits } from '@/libs/api/resume';
import { fetchUserData } from '@/libs/api/auth';
import { getServerCookie } from '@/libs/cookies';
import { refreshToken } from '@/libs/api/auth';

interface User {
    username: string;
    email: string;
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
        const accessToken = await getServerCookie('accessToken');
        if (accessToken) {

            try {
                const [exists, me] = await Promise.all([
                    isResumeExits(),
                    fetchUserData(),
                    refreshToken()
                ]);

                setUser({ ...exists, ...me });
            } catch (error) {
                console.error('Error fetching resume existence:', error);
            }
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