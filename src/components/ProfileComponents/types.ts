import { instagramValidation, tiktokValidation } from '@/helpers/validations';
import { z } from 'zod';

export type EditSocialLinksRequestBody = {
  instagram_handle?: string;
  tiktok_handle?: string;
};

export const EditSocialLinksSchema = z.object({
  instagram_handle: instagramValidation,
  tiktok_handle: tiktokValidation,
});

export const defaultValues = {
  instagram_handle: '',
  tiktok_handle: '',
};
