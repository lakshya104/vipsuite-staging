import { z } from 'zod';
import { interestValidation } from '@/helpers/validations';

export const interestSchema = z.object({
  interests: interestValidation,
});

export type FormValues = z.infer<typeof interestSchema>;
