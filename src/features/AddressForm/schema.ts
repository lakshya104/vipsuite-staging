import * as z from 'zod';

export const formSchema = z.object({
  first_name: z.string().min(1, 'First name is required.'),
  last_name: z.string().min(1, 'Last name is required.'),
  address_line_1: z.string().min(1, 'Address line 1 is required.'),
  address_line_2: z.string().min(1, 'Address line 2 is required.'),
  city: z.string().min(1, 'City is required.'),
  postcode: z.string().min(1, 'Postcode is required.'),
  state: z.string().min(1, 'State is required.'),
  country: z.string().min(1, 'Country is required.'),
  phone: z.string().min(1, 'Phone is required.'),
  company: z.string().optional().or(z.literal('')),
});

export type AddAddressFormValue = z.infer<typeof formSchema>;
