import * as z from 'zod';

export const LoginSchema = z.object({
  username: z.string().min(6, {
    message: 'Username is required',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
  }),
});

export interface LoginFormValues {
  username: string;
  password: string;
}
