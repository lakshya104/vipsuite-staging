import { z } from 'zod';

export const ResetPasswordSchema = z
  .object({
    code: z.string().min(1, 'Reset code is required'),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .regex(/[a-zA-Z]/, {
        message: 'Password must contain at least one letter, one digit and one special character',
      })
      .regex(/[0-9]/, {
        message: 'Password must contain at least one letter, one digit and one special character',
      })
      .regex(/[@#$%^&*()_+\-=[\]{};':"\\|,.<>!/?]/, {
        message: 'Password must contain at least one letter, one digit and one special character',
      })
      .min(6, { message: 'Password must be at least 6 characters long' }),
    repeatPassword: z.string().min(1, { message: 'Repeating password is required' }),
    // .regex(/[a-zA-Z]/, {
    //   message: 'Password must contain at least one letter, one digit and one special character',
    // })
    // .regex(/[0-9]/, {
    //   message: 'Password must contain at least one letter, one digit and one special character',
    // })
    // .regex(/[@#$%^&*()_+\-=[\]{};':"\\|,.<>!/?]/, {
    //   message: 'Password must contain at least one letter, one digit and one special character',
    // })
    // .min(6, { message: 'Password must be at least 6 characters long' }),
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
