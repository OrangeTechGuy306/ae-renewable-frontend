import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { calculationsApi } from '@/lib/api';
import type { SaveCalculationData } from '@/types/api';
import { toast } from 'sonner';

/**
 * Get user's calculations
 */
export function useMyCalculations(page = 1, limit = 20) {
  return useQuery({
    queryKey: ['calculations', 'my', page, limit],
    queryFn: () => calculationsApi.getMy(page, limit),
  });
}

/**
 * Get all calculations (admin only)
 */
export function useAllCalculations(page = 1, limit = 20) {
  return useQuery({
    queryKey: ['calculations', 'all', page, limit],
    queryFn: () => calculationsApi.getAll(page, limit),
  });
}

/**
 * Get single calculation
 */
export function useCalculation(id: string) {
  return useQuery({
    queryKey: ['calculation', id],
    queryFn: () => calculationsApi.getById(id),
    enabled: !!id,
  });
}

/**
 * Save calculation mutation
 */
export function useSaveCalculation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SaveCalculationData) => calculationsApi.save(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calculations'] });
      toast.success('Calculation saved successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to save calculation.';
      toast.error(message);
    },
  });
}

/**
 * Update calculation mutation
 */
export function useUpdateCalculation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SaveCalculationData> }) =>
      calculationsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['calculations'] });
      queryClient.invalidateQueries({ queryKey: ['calculation', variables.id] });
      toast.success('Calculation updated successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update calculation.';
      toast.error(message);
    },
  });
}

/**
 * Delete calculation mutation
 */
export function useDeleteCalculation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => calculationsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calculations'] });
      toast.success('Calculation deleted successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete calculation.';
      toast.error(message);
    },
  });
}
