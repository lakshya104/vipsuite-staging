import { z } from 'zod';

export const ResetPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  code: z.string().min(1, 'Reset code is required'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters long'),
});

export const defaultValues = {
  email: '',
  code: '',
  password: '',
};

export type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;
