import apiClient from '../axios';
import {
  Component,
  CreateComponentData,
  ComponentFilters,
  PaginatedResponse,
  ApiResponse,
  ComponentStats,
} from '@/types/api';

export const componentsApi = {
  /**
   * Get all components with filters
   */
  getAll: async (filters?: ComponentFilters): Promise<PaginatedResponse<Component>> => {
    const response = await apiClient.get<PaginatedResponse<Component>>('/components', {
      params: filters,
    });
    return response.data;
  },

  /**
   * Get single component by ID
   */
  getById: async (id: string): Promise<ApiResponse<Component>> => {
    const response = await apiClient.get<ApiResponse<Component>>(`/components/${id}`);
    return response.data;
  },

  /**
   * Search components
   */
  search: async (query: string, limit?: number): Promise<ApiResponse<Component[]>> => {
    const response = await apiClient.get<ApiResponse<Component[]>>('/components/search', {
      params: { q: query, limit },
    });
    return response.data;
  },

  /**
   * Get components by category
   */
  getByCategory: async (category: string): Promise<ApiResponse<Component[]>> => {
    const response = await apiClient.get<ApiResponse<Component[]>>(`/components/category/${category}`);
    return response.data;
  },

  /**
   * Create new component (admin only)
   */
  create: async (data: CreateComponentData): Promise<ApiResponse<Component>> => {
    const response = await apiClient.post<ApiResponse<Component>>('/components', data);
    return response.data;
  },

  /**
   * Update component (admin only)
   */
  update: async (id: string, data: Partial<CreateComponentData>): Promise<ApiResponse<Component>> => {
    const response = await apiClient.put<ApiResponse<Component>>(`/components/${id}`, data);
    return response.data;
  },

  /**
   * Delete component (admin only)
   */
  delete: async (id: string): Promise<ApiResponse> => {
    const response = await apiClient.delete<ApiResponse>(`/components/${id}`);
    return response.data;
  },

  /**
   * Get component statistics
   */
  getStats: async (): Promise<ApiResponse<ComponentStats>> => {
    const response = await apiClient.get<ApiResponse<ComponentStats>>('/components/stats');
    return response.data;
  },

  /**
   * Bulk create components (admin only)
   */
  bulkCreate: async (components: CreateComponentData[]): Promise<ApiResponse<Component[]>> => {
    const response = await apiClient.post<ApiResponse<Component[]>>('/components/bulk', { components });
    return response.data;
  },
};
