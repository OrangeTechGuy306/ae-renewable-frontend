import { useMutation } from '@tanstack/react-query';
import { contactApi } from '@/lib/api';
import type { SubmitContactData } from '@/types/api';
import { toast } from 'sonner';

/**
 * Submit contact inquiry mutation
 */
export function useSubmitContact() {
  return useMutation({
    mutationFn: (data: SubmitContactData) => contactApi.submit(data),
    onSuccess: () => {
      toast.success('Your message has been sent successfully! We will get back to you soon.');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to send message. Please try again.';
      toast.error(message);
    },
  });
}
