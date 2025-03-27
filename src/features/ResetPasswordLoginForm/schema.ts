import { z } from 'zod';
import { passwordValidation } from '@/helpers/validations';
import en from '@/helpers/lang';

export const ResetPasswordSchema = z
  .object({
    password: passwordValidation,
    repeatPassword: passwordValidation,
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ['repeatPassword'],
    message: en.signup.errorMessage.passMatch,
  });

export const defaultValues = {
  password: '',
  repeatPassword: '',
};

export type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;
