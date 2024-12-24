import axios from 'axios';

import { logout, refreshSession } from '../redux/user/operations.js';

export const setAuthHeader = (token) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axiosInstance.defaults.headers.common.Authorization = '';
};

// https://medium.com/@velja/token-refresh-with-axios-interceptors-for-a-seamless-authentication-experience-854b06064bde
// https://vite.dev/guide/env-and-mode
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const setupInterceptors = (store) => {
  axiosInstance.interceptors.response.use(
    (response) => response, // Directly return successful responses.
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        // Mark the request as retried to avoid infinite loops.
        try {
          originalRequest._retry = true;
          const peremenaya = await store.dispatch(refreshSession()).unwrap();
          console.log(peremenaya);
          setAuthHeader(peremenaya.data.accessToken);
          console.log(
            'Headers: ',
            axiosInstance.defaults.headers.common.Authorization,
          );
          return axiosInstance(originalRequest); // Retry the original request with the new access token.
        } catch (refreshError) {
          // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
          console.log(refreshError);
          await store.dispatch(logout());
          console.log('first');
          window.location.href = '/signin';
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error); // For all other errors, return the error as is.
    },
  );
};
