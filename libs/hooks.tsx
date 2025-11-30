import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getServerCookie } from '@/libs/cookies';

// may couse flickering in interface
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    const item = localStorage.getItem(key);
    const storedValue = item ? JSON.parse(item) as T : initialValue;
    console.log({ storedValue });

    setState(storedValue);
  }, [key, initialValue]);

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      console.log({ valueToStore });
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setState(valueToStore);
    } catch (error) {
      console.log(error);
    }
  };

  return [state, setValue];
}

//there is problem with dehydration
export const useLocalStorageWIP = <T,>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.log(error);
    }
  });

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setState(valueToStore);
    } catch (error) {
      console.log(error);
    }
  };

  return [state, setValue];
};

// receiving status from localstorage in useEffect couse flickering sidenav menu. Temporary use this solution
// there is problem on server side with error 500 in console, but no flickering in interface
export function useLocalStorage2<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? (JSON.parse(storedValue) as T) : initialValue;

  // that code moves error from server to browser:(
  // let initial;
  // try {
  //   const storedValue = window.localStorage.getItem(key);
  //   initial = storedValue ? (JSON.parse(storedValue) as T) : initialValue;
  // } catch (err) {}

  const [value, setValue] = useState<T>(initial ?? initialValue);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setValue(value);
    } catch (error) {
      console.log(error);
    }
  }, [key, value]);

  return [value, setValue];
}

// haves same problems
export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const storedValue = sessionStorage.getItem(key);
  const initial = storedValue ? (JSON.parse(storedValue) as T) : initialValue;

  const [state, setState] = useState<T>(initial ?? initialValue);

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    const valueToStore = value instanceof Function ? value(state) : value;
    sessionStorage.setItem(key, JSON.stringify(valueToStore));
    setState(valueToStore);
  };

  return [state, setValue];
}

export const useSidenavCollapse = () =>
  useLocalStorage2('collapsed-menu', false);

export const useAuth = () => {
  const [state, setState] = useState<boolean>();

  useEffect(() => {
    getServerCookie('accessToken').then((accessToken) => {
      setState(!!accessToken);
    });
  }, []);

  return [state];
};
