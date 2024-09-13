import { z } from 'zod';

export const interestSchema = z.object({
  interests: z.array(z.string()).min(1, { message: 'Please select an option' }),
});

export type FormValues = z.infer<typeof interestSchema>;
