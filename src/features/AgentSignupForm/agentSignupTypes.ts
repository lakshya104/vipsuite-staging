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
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
  phone: z.string().regex(/^\d{12}$/, {
    message: 'Phone number must be 12 digits including country code',
  }),
  company_name: z.string().min(4, 'Company Name must be at least 3 characters long').optional().or(z.literal('')),
  type_of_representation: z.string().min(3, {
    message: 'Instagram username is required',
  }),
  vip_managed: z.string().min(3, {
    message: 'TikTok username is required',
  }),
});

export interface AgentSignupValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  company_name: string;
  type_of_representation: string;
  vip_managed: string;
}

export const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  phone: '',
  company_name: '',
  type_of_representation: '',
  vip_managed: '',
};
