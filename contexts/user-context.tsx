'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from 'react';
import { isResumeExits } from '@/libs/api/resume';
import { decodeToken, fetchUserData } from '@/libs/api/auth';
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
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
};

const UserContext = createContext<UserContextType | null>(null);

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleStartInterval = async () => {
      const { exp } = await decodeToken(accessToken);
      const TokenValiditySeconds = exp - Math.floor(Date.now() / 1000);

      timeout = setTimeout(async () => {
        const { access_token } = await refreshToken();
        setAccessToken(access_token);

        //   console.log('token updated', new Date().toLocaleString(), {
        //     accessToken,
        //     interval: timeout,
        //   });
      }, (TokenValiditySeconds - 60) * 1000);

      //   console.log(
      //     `timeout (${timeout}) started for refresh token after ${
      //       TokenValiditySeconds - 60
      //     } sec`
      //   );
    };

    if (accessToken && !timeout) {
      handleStartInterval();
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
        // console.log(`timeout (${timeout}) stoped`);
      }
    };
  }, [accessToken]);

  const getUserData = async () => {
    const token = await getServerCookie('accessToken');
    setAccessToken(token ?? null); // clear token must be 'null', not undefined!

    if (token) {
      try {
        const [exists, me] = await Promise.all([
          isResumeExits(),
          fetchUserData(),
        ]);

        const newUserData = { ...exists, ...me };
        setUser(newUserData);

        console.log('this is me', newUserData);
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
    <UserContext.Provider value={{ user, setUser, setAccessToken }}>
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
