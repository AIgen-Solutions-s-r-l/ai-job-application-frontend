'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { redirect } from 'next/navigation';
import config from '@/config';
import { isResumeExits } from '@/libs/api/resume';
import { decodeToken, fetchUserData } from '@/libs/api/auth';
import { deleteServerCookie, getServerCookie } from '@/libs/cookies';
import { refreshToken } from '@/libs/api/auth';

interface User {
  id: string;
  username: string;
  email: string;
  exists: boolean; // Indicates if a resume exists for the user
  auth_type: 'password' | 'google' | 'both' | null; // Added auth_type
}

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>; // Allow null during initialization/logout
  setAccessToken: Dispatch<SetStateAction<string>>;
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
    // eslint-disable-next-line no-undef
    let timeout: NodeJS.Timeout;

    const handleStartInterval = async () => {
      if (!accessToken) {
        return;
      }

      const { exp } = await decodeToken(accessToken);
      const tokenValiditySeconds = exp - Math.floor(Date.now() / 1000);

      timeout = setTimeout(async () => {
        try {
          const { access_token } = await refreshToken();
          setAccessToken(access_token);

          // console.log('token updated', new Date().toLocaleString(), {
          //   accessToken,
          //   interval: timeout,
          // });
        } catch (error) {
          console.error('error on token update', error);

          await deleteServerCookie('accessToken');

          redirect(config.auth.loginUrl);
        }
      }, (tokenValiditySeconds - 60) * 1000);

      // console.log(
      //   `timeout (${timeout}) started for refresh token after ${
      //       tokenValiditySeconds - 60
      //   } sec`
      // );
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

        // Ensure all expected fields are present, including the new auth_type
        const newUserData: User = {
          id: me.id,
          username: me.username,
          email: me.email,
          exists: exists.exists, // Assuming exists comes from isResumeExits()
          auth_type: me.auth_type || null, // Get auth_type from /me response, default to null
        };
        setUser(newUserData);

        // console.log('this is me', newUserData);
      } catch (error) {
        console.error('Error fetching resume existence:', error);
      }
    } else {
      localStorage.removeItem('selectedJobs');
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
