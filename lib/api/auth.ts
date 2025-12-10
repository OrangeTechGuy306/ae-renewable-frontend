import apiClient from '../axios';
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  UpdateProfileData,
  UpdatePasswordData,
  User,
} from '@/types/auth';
import { ApiResponse } from '@/types/api';

export const authApi = {
  /**
   * Register a new user
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me');
    return response.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: UpdateProfileData): Promise<ApiResponse<User>> => {
    const response = await apiClient.put<ApiResponse<User>>('/auth/profile', data);
    return response.data;
  },

  /**
   * Update password
   */
  updatePassword: async (data: UpdatePasswordData): Promise<ApiResponse> => {
    const response = await apiClient.put<ApiResponse>('/auth/password', data);
    return response.data;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>('/auth/logout');
    return response.data;
  },
};
