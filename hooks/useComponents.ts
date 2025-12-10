import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { componentsApi } from '@/lib/api';
import type { ComponentFilters, CreateComponentData } from '@/types/api';
import { toast } from 'sonner';

/**
 * Get all components with filters
 */
export function useComponents(filters?: ComponentFilters) {
  return useQuery({
    queryKey: ['components', filters],
    queryFn: () => componentsApi.getAll(filters),
  });
}

/**
 * Get single component by ID
 */
export function useComponent(id: string) {
  return useQuery({
    queryKey: ['component', id],
    queryFn: () => componentsApi.getById(id),
    enabled: !!id,
  });
}

/**
 * Search components
 */
export function useSearchComponents(query: string, limit?: number) {
  return useQuery({
    queryKey: ['components', 'search', query, limit],
    queryFn: () => componentsApi.search(query, limit),
    enabled: query.length > 0,
  });
}

/**
 * Get components by category
 */
export function useComponentsByCategory(category: string) {
  return useQuery({
    queryKey: ['components', 'category', category],
    queryFn: () => componentsApi.getByCategory(category),
    enabled: !!category,
  });
}

/**
 * Get component statistics
 */
export function useComponentStats() {
  return useQuery({
    queryKey: ['components', 'stats'],
    queryFn: () => componentsApi.getStats(),
  });
}

/**
 * Create component mutation
 */
export function useCreateComponent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateComponentData) => componentsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['components'] });
      toast.success('Component created successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to create component.';
      toast.error(message);
    },
  });
}

/**
 * Update component mutation
 */
export function useUpdateComponent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateComponentData> }) =>
      componentsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['components'] });
      queryClient.invalidateQueries({ queryKey: ['component', variables.id] });
      toast.success('Component updated successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update component.';
      toast.error(message);
    },
  });
}

/**
 * Delete component mutation
 */
export function useDeleteComponent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => componentsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['components'] });
      toast.success('Component deleted successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete component.';
      toast.error(message);
    },
  });
}

/**
 * Bulk create components mutation
 */
export function useBulkCreateComponents() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (components: CreateComponentData[]) => componentsApi.bulkCreate(components),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['components'] });
      toast.success(`Successfully created ${response.data?.length || 0} components!`);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to create components.';
      toast.error(message);
    },
  });
}
