'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isResumeExits } from '@/libs/api/resume';
import { fetchUserData } from '@/libs/api/auth';
import { getServerCookie } from '@/libs/cookies';
import { refreshToken } from '@/libs/api/auth';

interface User {
    id: string;
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
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const getUserData = async () => {
        const token = await getServerCookie('accessToken');
        setAccessToken(token);
        if (token) {
            try {
                const [exists, me] = await Promise.all([
                    isResumeExits(),
                    fetchUserData(),
                ]);

                setUser({ ...exists, ...me });
            } catch (error) {
                console.error('Error fetching resume existence:', error);
            }
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        getUserData();
    }, [accessToken]);

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