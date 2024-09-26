import * as z from 'zod';

export const AgentSignupSchema = z.object({
  first_name: z.string().min(2, {
    message: 'Please enter your first name',
  }),
  last_name: z.string().min(2, {
    message: 'Please enter your last name',
  }),
  email: z.string().email({
    message: 'Invalid email format',
  }),
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
  company_name: z.string().min(4, 'Company Name must be at least 3 characters long').optional().or(z.literal('')),
  examples_of_vip_managed: z.string().min(3, {
    message: 'Types of Vip managed is required',
  }),
  vip_examples: z
    .array(
      z
        .object({
          value: z.string(),
        })
        .optional()
        .or(z.literal('')),
    )
    .optional()
    .or(z.literal('')),
});

export interface AgentSignupValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  company_name: string;
  examples_of_vip_managed: string;
  vip_examples: { value: string }[];
}

export const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  phone: '',
  company_name: '',
  examples_of_vip_managed: '',
};
