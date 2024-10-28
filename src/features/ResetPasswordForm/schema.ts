import { z } from 'zod';

export const ResetPasswordSchema = z
  .object({
    code: z.string().min(1, 'Reset code is required'),
    password: z
    .string()
    .min(1, { message: 'Password is required' })
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/, {
      message:
        'Password must contain at least one uppercase letter, one digit, one special character and minimum 6 character long',
    }),
    repeatPassword: z.string().min(1, { message: 'Repeating password is required' }),
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
