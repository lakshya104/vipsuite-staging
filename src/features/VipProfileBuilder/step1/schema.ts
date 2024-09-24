import { z } from 'zod';

export const interestSchema = z.object({
  interests: z.array(z.string()).min(1, { message: 'Please select one interest' }),
  type_of_content_create: z.array(z.string()).min(1, { message: 'Please select one content creation type' }),
});

export type FormValues = z.infer<typeof interestSchema>;
