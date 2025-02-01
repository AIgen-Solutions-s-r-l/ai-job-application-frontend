'use server'
import { cookies } from 'next/headers';

export async function getServerCookie(name: string): Promise<string | undefined> {
  return cookies().get(name)?.value;
}

export async function setServerCookie(name: string, value: string, options: {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  maxAge?: number;
  path?: string;
  domain?: string;
  expires?: Date;
}): Promise<void> {
  cookies().set(name, value, options);
}

export async function deleteServerCookie(name: string): Promise<void> {
  cookies().delete(name);
}