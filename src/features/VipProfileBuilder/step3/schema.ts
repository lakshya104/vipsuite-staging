import * as z from 'zod';

export const formSchema = z.object({
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  birthplace: z.string().min(1, 'Birthplace is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  ethnicity: z.string().min(1, 'Ethnicity is required'),
  numberOfChildren: z.string().min(1, 'Number of Children is required'),
  ageOfChild: z.string().min(1, 'Age of Child is required'),
  pets: z.string().min(1, 'Pets field is required'),
  homePostcode: z.string().min(1, 'Home Postcode is required'),
});

export type Step3FormValues = z.infer<typeof formSchema>;

export const defaultValues = {
  dateOfBirth: '',
  birthplace: '',
  nationality: '',
  ethnicity: '',
  numberOfChildren: '',
  ageOfChild: '',
  pets: '',
  homePostcode: '',
};
