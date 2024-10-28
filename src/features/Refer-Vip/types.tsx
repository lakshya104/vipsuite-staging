import * as z from 'zod';
import { instagramValidation, requiredEmailValidation, tiktokValidation } from '@/helpers/validations';

export const ReferVipSchema = z.object({
  email: requiredEmailValidation,
  instagram_handle: instagramValidation,
  tiktok_handle: tiktokValidation,
});

export const FormValues = {
  email: '',
  instagram_handle: '',
  tiktok_handle: '',
};
