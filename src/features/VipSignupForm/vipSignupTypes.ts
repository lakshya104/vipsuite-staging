import * as z from 'zod';

export const VipSignupSchema = z.object({
  first_name: z.string().min(1, { message: 'First Name is required' }).min(3, {
    message: 'First Name must be at least 3 characters long',
  }),
  last_name: z.string().min(1, { message: 'Last Name is required' }).min(3, {
    message: 'Last Name must be at least 3 characters long',
  }),
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Please enter a valid email' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/, {
      message:
        'Password must contain at least one uppercase letter, one digit, one special character and minimum 6 character long',
    }),
  phone: z
    .string()
    .regex(/^\+?([1-9]\d?)\d{10}$/, {
      message: 'Phone number must be 10 digits, with a mandatory 2-3 digit country code.',
    })
    .min(11, { message: 'Phone number must be 10 digits, with a mandatory 2-3 digit country code.' })
    .max(15, { message: 'Phone number must be 10 digits, with a mandatory 2-3 digit country code.' })
    .optional()
    .or(z.literal('')),
  secondary_email: z.string().email({ message: 'Please enter a valid email' }).optional().or(z.literal('')),
  instagram_handle: z.string().min(3, {
    message: 'Instagram field is required',
  }),
  tiktok_handle: z.string().min(3, {
    message: 'TikTok field is required',
  }),
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
