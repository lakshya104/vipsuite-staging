import * as z from 'zod';

export const AgentSignupSchema = z.object({
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
  company_name: z.string().min(6, {
    message: 'Company Name must be at least 6 characters long',
  }),
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
