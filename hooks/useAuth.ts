import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/api';
import { useAuthContext } from '@/contexts/AuthContext';
import type { LoginCredentials, RegisterData, UpdateProfileData, UpdatePasswordData } from '@/types/auth';
import { toast } from 'sonner';

/**
 * Login mutation hook
 */
export function useLogin() {
  const { login } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      login(data.data.user, data.data.token);
      queryClient.invalidateQueries();
      toast.success('Login successful!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
    },
  });
}

/**
 * Register mutation hook
 */
export function useRegister() {
  const { login } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterData) => authApi.register(data),
    onSuccess: (data) => {
      login(data.data.user, data.data.token);
      queryClient.invalidateQueries();
      toast.success('Registration successful!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
    },
  });
}

/**
 * Get user profile query hook
 */
export function useProfile() {
  const { isAuthenticated } = useAuthContext();

  return useQuery({
    queryKey: ['profile'],
    queryFn: () => authApi.getProfile(),
    enabled: isAuthenticated,
  });
}

/**
 * Update profile mutation hook
 */
export function useUpdateProfile() {
  const { updateUser } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileData) => authApi.updateProfile(data),
    onSuccess: (response) => {
      if (response.data) {
        updateUser(response.data);
      }
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile updated successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update profile.';
      toast.error(message);
    },
  });
}

/**
 * Update password mutation hook
 */
export function useUpdatePassword() {
  return useMutation({
    mutationFn: (data: UpdatePasswordData) => authApi.updatePassword(data),
    onSuccess: () => {
      toast.success('Password updated successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update password.';
      toast.error(message);
    },
  });
}

/**
 * Logout mutation hook
 */
export function useLogout() {
  const { logout } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      logout();
      queryClient.clear();
      toast.success('Logged out successfully!');
    },
    onError: () => {
      // Still logout on error
      logout();
      queryClient.clear();
    },
  });
}
