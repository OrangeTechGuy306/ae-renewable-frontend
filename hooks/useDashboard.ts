import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api';

/**
 * Get dashboard statistics
 */
export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => dashboardApi.getStats(),
  });
}

/**
 * Get recent activity
 */
export function useDashboardActivity(limit = 10) {
  return useQuery({
    queryKey: ['dashboard', 'activity', limit],
    queryFn: () => dashboardApi.getActivity(limit),
  });
}

/**
 * Get user-specific dashboard stats
 */
export function useMyDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'my-stats'],
    queryFn: () => dashboardApi.getMyStats(),
  });
}
