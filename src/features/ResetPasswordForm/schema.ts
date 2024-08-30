import { z } from 'zod';

export const ResetPasswordSchema = z
  .object({
    code: z.string().min(1, 'Reset code is required'),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
      .regex(/[0-9]/, { message: 'Password must contain at least one digit' })
      .regex(/[@#]/, { message: 'Password must contain at least one special character' })
      .min(6, { message: 'Password must be at least 6 characters long' }),
    repeatPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ['repeatPassword'],
    message: 'Passwords do not match',
  });

export const defaultValues = {
  code: '',
  password: '',
  repeatPassword: '',
};

export type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;
