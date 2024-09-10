import * as z from 'zod';

export const ReferVipSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Please enter a valid email' }),
  instagram_profile: z.string().min(3, {
    message: 'Instagram field is required',
  }),
  tiktok_profile: z.string().min(3, {
    message: 'TikTok field is required',
  }),
});

export const FormValues = {
  email: '',
  instagram_profile: '',
  tiktok_profile: '',
};
