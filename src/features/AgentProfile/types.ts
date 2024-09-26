import * as z from 'zod';

export const AgentEditProfileSchema = z.object({
  first_name: z.string().min(2, {
    message: 'Please enter your first name',
  }),
  last_name: z.string().min(2, {
    message: 'Please enter your last name',
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

export interface AgentEditProfileValues {
  first_name: string;
  last_name: string;
  phone: string;
  company_name: string;
  examples_of_vip_managed: string;
  vip_examples: { value: string }[];
}
