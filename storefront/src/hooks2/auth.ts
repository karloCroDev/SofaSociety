// External packages
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (values: z.infer<typeof loginFormSchema>) => login(values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['customer'] }),
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

export const useSignup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['signUp'],
    mutationFn: (values: z.infer<typeof signupSchema>) => signUp(values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['customer'] }),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['logOut'],
    mutationFn: async () => {
      return logOut();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['customer'] });
    },
  });
};
