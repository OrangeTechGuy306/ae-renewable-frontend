import apiClient from '../axios';
import {
  ContactInquiry,
  SubmitContactData,
  PaginatedResponse,
  ApiResponse,
} from '@/types/api';

export const contactApi = {
  /**
   * Submit contact inquiry
   */
  submit: async (data: SubmitContactData): Promise<ApiResponse<ContactInquiry>> => {
    const response = await apiClient.post<ApiResponse<ContactInquiry>>('/contact', data);
    return response.data;
  },

  /**
   * Get all inquiries (admin only)
   */
  getAll: async (page = 1, limit = 20, status?: string): Promise<PaginatedResponse<ContactInquiry>> => {
    const response = await apiClient.get<PaginatedResponse<ContactInquiry>>('/contact', {
      params: { page, limit, status },
    });
    return response.data;
  },

  /**
   * Get single inquiry (admin only)
   */
  getById: async (id: string): Promise<ApiResponse<ContactInquiry>> => {
    const response = await apiClient.get<ApiResponse<ContactInquiry>>(`/contact/${id}`);
    return response.data;
  },

  /**
   * Update inquiry status (admin only)
   */
  updateStatus: async (id: string, status: 'new' | 'in_progress' | 'resolved'): Promise<ApiResponse<ContactInquiry>> => {
    const response = await apiClient.put<ApiResponse<ContactInquiry>>(`/contact/${id}/status`, { status });
    return response.data;
  },

  /**
   * Delete inquiry (admin only)
   */
  delete: async (id: string): Promise<ApiResponse> => {
    const response = await apiClient.delete<ApiResponse>(`/contact/${id}`);
    return response.data;
  },

  /**
   * Get inquiry statistics (admin only)
   */
  getStats: async (): Promise<ApiResponse<any>> => {
    const response = await apiClient.get<ApiResponse<any>>('/contact/stats');
    return response.data;
  },
};
