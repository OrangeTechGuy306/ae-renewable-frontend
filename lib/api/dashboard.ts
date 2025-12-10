import apiClient from '../axios';
import {
  DashboardStats,
  Activity,
  UserDashboardStats,
  ApiResponse,
} from '@/types/api';

export const dashboardApi = {
  /**
   * Get dashboard statistics
   */
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const response = await apiClient.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return response.data;
  },

  /**
   * Get recent activity
   */
  getActivity: async (limit = 10): Promise<ApiResponse<Activity[]>> => {
    const response = await apiClient.get<ApiResponse<Activity[]>>('/dashboard/activity', {
      params: { limit },
    });
    return response.data;
  },

  /**
   * Get user-specific dashboard stats
   */
  getMyStats: async (): Promise<ApiResponse<UserDashboardStats>> => {
    const response = await apiClient.get<ApiResponse<UserDashboardStats>>('/dashboard/my-stats');
    return response.data;
  },
};
