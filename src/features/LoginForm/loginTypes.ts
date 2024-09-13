import * as z from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email('Invalid email address')
    .min(3, {
      message: 'Email must be at least 3 characters',
    }),
  password: z
    .string()
    .min(1, {
      message: 'Password is required',
    })
    .min(6, {
      message: 'Password must be at least 6 characters',
    }),
});

export interface LoginFormValues {
  email: string;
  password: string;
}
