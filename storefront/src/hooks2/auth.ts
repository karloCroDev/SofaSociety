// External packages
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { z } from 'zod';

// Lib
import { login, signUp, logOut, getCustomer } from '@/lib2/data/auth';

// Customer
export const useCustomer = () => {
  return useQuery({
    queryKey: ['customer'],
    queryFn: async () => getCustomer(),
    staleTime: 5 * 60 * 1000, // 1000 ms * 60 => 1min * 5 => 5min
  });
};

// Login
export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  redirect_url: z.string().optional().nullable(),
});
export type LoginArgs = z.infer<typeof loginFormSchema>;

export const useLogin = (
  options?: UseMutationOptions<
    { state: 'success' | 'error'; redirectUrl?: string; message?: string },
    Error,
    LoginArgs
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (values: LoginArgs) => login(values),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ['customer'] });
      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};

export const signupSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  phone: z.string().optional().nullable(),
  password: z.string().min(6),
});
export type SignUpArgs = z.infer<typeof signupSchema>;

export const useSignup = (
  options?: UseMutationOptions<
    { state: 'success' | 'error'; message?: string },
    Error,
    SignUpArgs
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['signUp'],
    mutationFn: (values: SignUpArgs) => signUp(values),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ['customer'] });
      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useLogout = (options?: UseMutationOptions<void, Error, void>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['logOut'],
    mutationFn: () => logOut(),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ['customer'] });
      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};
