import {
  firstNameValidation,
  instagramValidation,
  lastNameValidation,
  optionalEmailValidation,
  passwordValidation,
  phoneValidation,
  requiredEmailValidation,
  tiktokValidation,
} from '@/helpers/validations';
import * as z from 'zod';

export const VipSignupSchema = z.object({
  first_name: firstNameValidation,
  last_name: lastNameValidation,
  email: requiredEmailValidation,
  password: passwordValidation,
  phone: phoneValidation,
  secondary_email: optionalEmailValidation,
  instagram_handle: instagramValidation,
  tiktok_handle: tiktokValidation,
});

export const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  secondary_email: '',
  phone: '',
  instagram_handle: '',
  tiktok_handle: '',
};
