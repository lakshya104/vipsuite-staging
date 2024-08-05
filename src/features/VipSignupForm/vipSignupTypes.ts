import * as z from 'zod';

export const VipSignupSchema = z.object({
  first_name: z.string().min(2, {
    message: 'First Name must be at least 2 characters long',
  }),
  last_name: z.string().min(2, {
    message: 'Last Name must be at least 2 characters long',
  }),
  email: z.string().email({
    message: 'Invalid email format',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
  phone: z.string().regex(/^\d{10}$/, {
    message: 'Phone number must be 10 digits',
  }),
  secondary_email: z
    .string()
    .email({
      message: 'Invalid secondary email format',
    })
    .optional(),
  instagram_handle: z.string().min(3, {
    message: 'Instagram username is required',
  }),
  tiktok_handle: z.string().min(3, {
    message: 'TikTok username is required',
  }),
});
