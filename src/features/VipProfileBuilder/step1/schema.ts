import * as z from 'zod';

export const interestSchema = z.object({
  interests: z.array(z.string()).min(1, 'Select at least 1 interest').max(3, 'Select a maximum of 3 interests'),
});

export type FormValues = z.infer<typeof interestSchema>;
