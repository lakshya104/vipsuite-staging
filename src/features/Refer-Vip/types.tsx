import * as z from 'zod';
import { instagramValidationRequired, requiredEmailValidation, tiktokValidationRequired } from '@/helpers/validations';

export const ReferVipSchema = z.object({
  email: requiredEmailValidation,
  instagram_handle: instagramValidationRequired,
  tiktok_handle: tiktokValidationRequired,
});

export const FormValues = {
  email: '',
  instagram_handle: '',
  tiktok_handle: '',
};
