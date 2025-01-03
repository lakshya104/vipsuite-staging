import * as z from 'zod';
import { loginPasswordValidation, requiredEmailValidation } from '@/helpers/validations';

export const LoginSchema = z.object({
  email: requiredEmailValidation,
  password: loginPasswordValidation,
});

export interface LoginFormValues {
  email: string;
  password: string;
}
