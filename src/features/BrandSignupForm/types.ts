import * as z from 'zod';

export const BrandSignupSchema = z.object({
  brand_name: z.string().min(2, {
    message: 'Please enter your brand name',
  }),
  contact_name: z.string().min(2, {
    message: 'Please enter your contact name',
  }),
  email: z.string().email({
    message: 'Invalid email format',
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
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/, {
      message:
        'Password must contain at least one uppercase letter, one digit, one special character and minimum 6 character long',
    }),
  type_of_business: z.string().min(2, {
    message: 'Please enter your contact name',
  }),
});

export interface BrandSignupValues {
  brand_name: string;
  contact_name: string;
  email: string;
  phone: string;
  password: string;
  type_of_business: string;
}

export const defaultValues = {
  brand_name: '',
  contact_name: '',
  email: '',
  phone: '',
  password: '',
  type_of_business: '',
};
