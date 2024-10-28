import { z } from 'zod';
import { interestValidation, typeOfContentValidation } from '@/helpers/validations';

export const interestSchema = z.object({
  interests: interestValidation,
  type_of_content_create: typeOfContentValidation,
});

export type FormValues = z.infer<typeof interestSchema>;
