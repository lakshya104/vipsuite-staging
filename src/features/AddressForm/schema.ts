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
  phone: z
    .string()
    .regex(/^\+?([1-9]\d?)\d{10}$/, {
      message: 'Phone number must be 10 digits, with a mandatory 2-3 digit country code.',
    })
    .min(11, { message: 'Phone number must be 10 digits, with a mandatory 2-3 digit country code.' })
    .max(15, { message: 'Phone number must be 10 digits, with a mandatory 2-3 digit country code.' }),
  company: z.string().optional().or(z.literal('')),
});

export type AddAddressFormValue = z.infer<typeof formSchema>;

export const addNewAddressField = [
  {
    name: 'first_name',
    placeholder: 'First Name',
  },
  {
    name: 'last_name',
    placeholder: 'Last Name',
  },
  {
    name: 'address_line_1',
    placeholder: 'Address Line 1',
  },
  {
    name: 'address_line_2',
    placeholder: 'Address Line 2',
  },
  {
    name: 'city',
    placeholder: 'City',
  },
  {
    name: 'state',
    placeholder: 'State',
  },
  {
    name: 'country',
    placeholder: 'Country',
  },
  {
    name: 'postcode',
    placeholder: 'Postcode',
  },
  {
    name: 'phone',
    placeholder: 'Phone',
  },
  {
    name: 'company',
    placeholder: 'Company',
  },
];
