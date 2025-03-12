import * as z from 'zod';
import {
  averageEngagementValidation,
  firstNameValidation,
  instagramValidation,
  lastNameValidation,
  tiktokValidation,
  typeOfRepresentationValidation,
} from '@/helpers/validations';

export const formSchema = z.object({
  first_name: firstNameValidation,
  last_name: lastNameValidation,
  type_of_representation: typeOfRepresentationValidation,
  instagram_handle: instagramValidation,
  tiktok_handle: tiktokValidation,
  avg_engagement: averageEngagementValidation,
});

export type AgentFormValues = z.infer<typeof formSchema>;
