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
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && accessToken) {
        try {
          const { exp } = await decodeToken(accessToken);
          const tokenValiditySeconds = exp - Math.floor(Date.now() / 1000);
          const TEN_MINUTES = 10 * 60;

          if (tokenValiditySeconds <= TEN_MINUTES) {
            const { access_token } = await refreshToken();
            setAccessToken(access_token);
          }
        } catch (error) {
          console.error('error on token update', error);
          await deleteServerCookie('accessToken');
          redirect(config.auth.loginUrl);
        }
      }
    };

    const startRefreshInterval = async () => {
      if (!accessToken) return;

      try {
        const { exp } = await decodeToken(accessToken);
        const tokenValiditySeconds = exp - Math.floor(Date.now() / 1000);
        const TEN_MINUTES = 10 * 60;

        if (interval) {
          clearInterval(interval);
        }

        interval = setInterval(async () => {
          try {
            const { exp: newExp } = await decodeToken(accessToken);
            const newTokenValiditySeconds = newExp - Math.floor(Date.now() / 1000);

            if (newTokenValiditySeconds <= TEN_MINUTES) {
              const { access_token } = await refreshToken();
              setAccessToken(access_token);
            }
          } catch (error) {
            console.error('error on token update', error);
            await deleteServerCookie('accessToken');
            redirect(config.auth.loginUrl);
          }
        }, 60 * 1000);

        if (tokenValiditySeconds <= TEN_MINUTES) {
          const { access_token } = await refreshToken();
          setAccessToken(access_token);
        }
      } catch (error) {
        console.error('error decoding token', error);
        await deleteServerCookie('accessToken');
        redirect(config.auth.loginUrl);
      }
    };

    startRefreshInterval();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
      if (timeout) {
        clearTimeout(timeout);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [accessToken]);

  useEffect(() => {
    const syncLogout = (event: StorageEvent) => {
      if (event.key === 'logout') {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem('selectedJobs');
        router.replace(config.auth.loginUrl);
      }
    };
    window.addEventListener('storage', syncLogout);
    return () => window.removeEventListener('storage', syncLogout);
  }, [router, setAccessToken, setUser]);

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
