import { z } from 'zod';
import { codeValidation, passwordValidation } from '@/helpers/validations';
import en from '@/helpers/lang';

export const ResetPasswordSchema = z
  .object({
    code: codeValidation,
    password: passwordValidation,
    repeatPassword: passwordValidation,
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ['repeatPassword'],
    message: en.signup.errorMessage.passMatch,
  });

export const defaultValues = {
  code: '',
  password: '',
  repeatPassword: '',
};

export type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;
