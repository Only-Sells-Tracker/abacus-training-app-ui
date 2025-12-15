import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import CONSTANTS from './constants';
import { useUserStore } from '../store/useUserStore';

const api = axios.create({
  baseURL: 'http://localhost:3001/mockapi',
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': JSON.parse(localStorage.getItem(CONSTANTS.AUTHENTICATED_USER_STORAGE_KEY) || '{}').token || '',
  },
});

const { authenticatedUser, removeAuthenticatedUser } = useUserStore.getState();

// Request interceptor to add the auth token to headers
api.interceptors.request.use(
  config => {
    try {
      const storedUser = localStorage.getItem(CONSTANTS.AUTHENTICATED_USER_STORAGE_KEY);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (error) {
      console.error('Error parsing user from localStorage', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      removeAuthenticatedUser();
    }
    return Promise.reject(error);
  }
);

export interface ApiResponse<T = any> {
  data: T;
  error: string | null;
}

// export async function http<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
//   try {
//     const response: AxiosResponse<T> = await api(config);
//     return { data: response.data, error: null };
//   } catch (error) {
//     const axiosError = error as AxiosError;
//     // You can add more sophisticated error handling here
//     const errorMessage = axiosError.response?.data?.message || axiosError.message;
//     return { data: null as any, error: errorMessage };
//   }
// }

export default api;
