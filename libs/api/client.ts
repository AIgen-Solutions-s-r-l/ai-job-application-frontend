import axios from 'axios';

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

const apiClientJwt = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

apiClientJwt.interceptors.request.use(
  async (config) => {
    if (typeof window === 'undefined') { // Check if running on the server
      const cookies = require('next/headers').cookies; // Import only on server
      const cookieStore = cookies();
      const accessToken = cookieStore.get('accessToken')?.value;

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    console.error("Request Error:", error.message);
    return Promise.reject(error);
  }
);

const responseInterceptor = (response: any) => response;

const errorInterceptor = (error: any) => {
  console.error("API Error:", error.response || error.message);
  return Promise.reject(error);
};

apiClient.interceptors.response.use(responseInterceptor, errorInterceptor);
apiClientJwt.interceptors.response.use(responseInterceptor, errorInterceptor);

export { apiClient, apiClientJwt };