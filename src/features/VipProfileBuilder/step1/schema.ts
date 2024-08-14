import * as z from 'zod';

export const interestSchema = z.object({
  interests: z.array(z.string()).min(3, 'Select at least 3 interest'),
});

export type FormValues = z.infer<typeof interestSchema>;
