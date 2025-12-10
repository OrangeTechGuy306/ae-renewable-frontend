import apiClient from '../axios';
import {
  Calculation,
  SaveCalculationData,
  PaginatedResponse,
  ApiResponse,
} from '@/types/api';

export const calculationsApi = {
  /**
   * Save a new calculation
   */
  save: async (data: SaveCalculationData): Promise<ApiResponse<Calculation>> => {
    const response = await apiClient.post<ApiResponse<Calculation>>('/calculations', data);
    return response.data;
  },

  /**
   * Get user's calculations
   */
  getMy: async (page = 1, limit = 20): Promise<PaginatedResponse<Calculation>> => {
    const response = await apiClient.get<PaginatedResponse<Calculation>>('/calculations', {
      params: { page, limit },
    });
    return response.data;
  },

  /**
   * Get all calculations (admin only)
   */
  getAll: async (page = 1, limit = 20): Promise<PaginatedResponse<Calculation>> => {
    const response = await apiClient.get<PaginatedResponse<Calculation>>('/calculations/all', {
      params: { page, limit },
    });
    return response.data;
  },

  /**
   * Get single calculation by ID
   */
  getById: async (id: string): Promise<ApiResponse<Calculation>> => {
    const response = await apiClient.get<ApiResponse<Calculation>>(`/calculations/${id}`);
    return response.data;
  },

  /**
   * Update calculation
   */
  update: async (id: string, data: Partial<SaveCalculationData>): Promise<ApiResponse<Calculation>> => {
    const response = await apiClient.put<ApiResponse<Calculation>>(`/calculations/${id}`, data);
    return response.data;
  },

  /**
   * Delete calculation
   */
  delete: async (id: string): Promise<ApiResponse> => {
    const response = await apiClient.delete<ApiResponse>(`/calculations/${id}`);
    return response.data;
  },
};
