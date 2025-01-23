import * as z from 'zod';
import { loginPasswordValidation, requiredEmailValidation } from '@/helpers/validations';

export const LoginSchema = z.object({
  username: requiredEmailValidation,
  password: loginPasswordValidation,
});

export interface LoginFormValues {
  username: string;
  password: string;
}
