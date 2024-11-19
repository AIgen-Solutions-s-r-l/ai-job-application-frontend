import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// apiClient.interceptors.request.use(
//   async (config) => {
//     const supabase = createClient();
//     const {
//       data: { session },
//     } = await supabase.auth.getSession();

//     if (session?.access_token) {
//       config.headers.Authorization = `Bearer ${session.access_token}`;
//     }

//     return config;
//   },
//   (error) => {
//     console.error('Request Error:', error.message);
//     return Promise.reject(error);
//   }
// );

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;