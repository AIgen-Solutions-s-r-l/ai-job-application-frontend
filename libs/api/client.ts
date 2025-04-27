import axios from 'axios';
import { refreshToken } from './auth';

const API_KEY = process.env.API_KEY || '';
const API_KEY2 = process.env.API_KEY2 || '';
const isDevelopment = process.env.NODE_ENV === 'development';

const getHeaders = (contentType: string) => {
  const headers: Record<string, string> = {
    "Content-Type": contentType,
  };

  if (isDevelopment && API_KEY) {
    headers["apikey"] = API_KEY;
  }
  headers["api-key"] = API_KEY2;

  return headers;
};

const apiClient = axios.create({
  headers: getHeaders("application/json"),
  timeout: 200000,
});

const apiClientJwt = axios.create({
  headers: getHeaders("application/json"),
  timeout: 200000,
});

const apiClientMultipart = axios.create({
  headers: getHeaders('multipart/form-data'),
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

// const errorInterceptor = async (error: any) => {
//   // TODO: Uncomment - Backend api ends up in an infinite loop when the token expires.
//   // if (error?.response?.status === 401 && accessToken) {
//   //   try {
//   //     await refreshToken();
//   //     const originalRequest = error.config;
//   //     return apiClientJwt(originalRequest);
//   //   } catch (refreshError) {
//   //     redirect(`${config.auth.loginUrl}/`);
//   //   }
//   // }

//   if ([401, 403].includes(error?.response?.status)) {
//     // redirect(`${config.auth.loginUrl}/`)
//   }

//   return Promise.reject(error);
// };

const errorInterceptor = async (error: any) => {
  // const originalRequest = error.config;

  // if (error?.response?.status === 401 && !originalRequest._retry) {
  //   originalRequest._retry = true;

  //   try {
  //     const data = await refreshToken();

  //     originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

  //     return apiClientJwt(originalRequest);
  //   } catch (refreshError) {
  //     return Promise.reject(refreshError);
  //   }
  // }

  return Promise.reject(error);
};

apiClient.interceptors.response.use(responseInterceptor, errorInterceptor);
apiClientJwt.interceptors.response.use(responseInterceptor, errorInterceptor);
apiClientMultipart.interceptors.response.use(responseInterceptor, errorInterceptor);

export { apiClient, apiClientJwt, apiClientMultipart };