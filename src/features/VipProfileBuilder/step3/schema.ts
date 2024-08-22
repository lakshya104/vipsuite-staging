import * as z from 'zod';

export const formSchema = z.object({
  dateOfBirth: z.string().optional().or(z.literal('')),
  birthplace: z.string().optional().or(z.literal('')),
  nationality: z.string().optional().or(z.literal('')),
  ethnicity: z.string().optional().or(z.literal('')),
  numberOfChildren: z.string().optional().or(z.literal('')),
  ageOfChild: z
    .array(z.string().nullable())
    .refine((ages) => ages.length === 0 || ages.every((age) => age !== null), { message: 'Age of child is required' }),
  genderOfChild: z.array(z.string()),
  pets: z.string().optional().or(z.literal('')),
  homePostcode: z.string().optional().or(z.literal('')),
});

export const childInfoSchema = z.object({
  dob: z.string().nullable(),
  gender: z.string().nullable(),
});

export type Step3FormValues = z.infer<typeof formSchema>;
