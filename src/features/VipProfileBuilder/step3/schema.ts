import * as z from 'zod';

export const formSchema = z.object({
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
  birthplace: z.string().min(1, { message: 'Birthplace is required' }),
  nationality: z.string().min(1, { message: 'Nationality is required' }),
  ethnicity: z.string().min(1, { message: 'Ethnicity is required' }),
  numberOfChildren: z.string().min(1, { message: 'Number of children is required' }),
  ageOfChild: z.array(z.string().min(1, { message: 'Age of child is required' })),
  genderOfChild: z.array(z.string().min(1, { message: 'Gender of child is required' })),
  pets: z.string().min(1, { message: 'Pets information is required' }),
  homePostcode: z.string().min(1, { message: 'Home postcode is required' }),
});

export type Step3FormValues = z.infer<typeof formSchema>;
