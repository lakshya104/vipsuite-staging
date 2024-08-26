import { z } from 'zod';

export const interestSchema = z.object({
  interests: z
    .array(z.string())
    .min(1, { message: 'Please select an option' })
    .refine((interests) => interests.length >= 3, {
      message: 'Please select at least 3 options',
    }),
});

export type FormValues = z.infer<typeof interestSchema>;
