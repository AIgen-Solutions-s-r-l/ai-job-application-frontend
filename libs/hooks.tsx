import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getServerCookie } from "@/libs/cookies";
import { isServer } from "@tanstack/react-query";

//there is problem with dehydration
export const useLocalStorage = <T,>(
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

  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setState(value);
    } catch (error) {
      console.log(error);
    }
  };

  return [state, setValue];
};

// receiving status from localstorage in useEffect couse flicking sidenav menu. Temporary use this solution
// there is problem on server side, but browser console have 500 error
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

export const useSidenavCollapse = () =>
  useLocalStorage2("collapsed-menu", undefined);

export const useAuth = () => {
  const [state, setState] = useState<boolean>();

  useEffect(() => {
    getServerCookie("accessToken").then((accessToken) => {
      setState(!!accessToken);
    });
  }, []);

  return [state];
};
