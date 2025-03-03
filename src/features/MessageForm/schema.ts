import { z } from 'zod';
import { MessageBoxValidation } from '@/helpers/validations';

export const messageDetailsSchema = z.object({
  message: MessageBoxValidation,
});
