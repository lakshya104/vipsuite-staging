import * as z from 'zod';

export const formSchema = z.object({
  dateOfBirth: z.string().optional().or(z.literal('')),
  birthplace: z.string().optional().or(z.literal('')),
  nationality: z.string().optional().or(z.literal('')),
  ethnicity: z.string().optional().or(z.literal('')),
  numberOfChildren: z.string().optional().or(z.literal('')),
  ageOfChild: z.array(z.string().nullable()),
  genderOfChild: z.array(z.string().nullable()),
  pets: z.string().optional().or(z.literal('')),
  homePostcode: z.string().optional().or(z.literal('')),
});

export type Step3FormValues = z.infer<typeof formSchema>;
