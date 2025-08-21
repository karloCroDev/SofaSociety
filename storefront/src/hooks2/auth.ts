// External packages
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { z } from 'zod';

// Lib
import {
  login,
  signUp,
  logOut,
  getCustomer,
  resetPassword,
} from '@/lib2/data/auth';
import { email } from 'node_modules/zod/v4/core/regexes.cjs';

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

// Sign up
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

// Reset password

const OtpSchema = z.object({
  email: z.string().email(),
  token: z.string(),
});

export const resetPasswordLinkSchema = z
  .object({
    oldPassword: z.string().min(6).optional(), // If there is no session then nothing,
    password: z
      .string()
      .min(6, 'New password must be atleast 6 charachters long'),
    repeatPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

export type ResetPasswordLinkProps = z.infer<typeof resetPasswordLinkSchema> &
  z.infer<typeof OtpSchema> & {
    type: 'forgot' | 'reset';
  };

export const useResetPassword = (
  options?: UseMutationOptions<
    { state: 'success' | 'error'; redirectUrl?: string; message?: string },
    Error,
    ResetPasswordLinkProps
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['login'],
    mutationFn: ({
      oldPassword,
      email,
      repeatPassword,
      token,
      type,
    }: ResetPasswordLinkProps) =>
      resetPassword({
        email,
        repeatPassword,
        type,
        token,
        oldPassword,
      }),
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
