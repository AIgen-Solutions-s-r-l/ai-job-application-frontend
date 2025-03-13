import config from '@/config';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { refreshToken } from './auth';

const API_KEY = 'lab0!3425t3s';

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
    "apiKey": API_KEY,
  },
   timeout: 200000,
});

const apiClientJwt = axios.create({
  headers: {
    "Content-Type": "application/json",
    "apiKey": API_KEY,
  },
   timeout: 200000,
});

const apiClientMultipart = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data',
    "apiKey": API_KEY,
  },
   timeout: 200000,
});

let accessToken: string | null = null;

apiClientJwt.interceptors.request.use(
  async (config) => {
    if (typeof window === 'undefined') { // Check if running on the server
      const cookies = require('next/headers').cookies;
      const cookieStore = cookies();
      accessToken = cookieStore.get('accessToken')?.value;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    // console.error("Request Error:", error.message);
    return Promise.reject(error);
  }
);

apiClientMultipart.interceptors.request.use(
  async (config) => {
    if (typeof window === 'undefined') { // Check if running on the server
      const cookies = require('next/headers').cookies;
      const cookieStore = cookies();
      accessToken = cookieStore.get('accessToken')?.value;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const responseInterceptor = (response: any) => response;

const errorInterceptor = async (error: any) => {
  // TODO: Uncomment - Backend api ends up in an infinite loop when the token expires.
  // if (error?.response?.status === 401 && accessToken) {
  //   try {
  //     await refreshToken();
  //     const originalRequest = error.config;
  //     return apiClientJwt(originalRequest);
  //   } catch (refreshError) {
  //     redirect(`${config.auth.loginUrl}/`);
  //   }
  // }

  if ([401, 403].includes(error?.response?.status)) {
    // redirect(`${config.auth.loginUrl}/`)
  }

  return Promise.reject(error);
};

apiClient.interceptors.response.use(responseInterceptor, errorInterceptor);
apiClientJwt.interceptors.response.use(responseInterceptor, errorInterceptor);
apiClientMultipart.interceptors.response.use(responseInterceptor, errorInterceptor);

export { apiClient, apiClientJwt, apiClientMultipart };