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

export const agentFields = [
  { name: 'first_name', label: 'First Name', type: 'text', placeholder: 'First Name' },
  { name: 'last_name', label: 'Last Name', type: 'text', placeholder: 'Last Name' },
  {
    name: 'type_of_representation',
    label: 'Type of Representation',
    type: 'select',
    placeholder: 'Type of Representation',
  },
  { name: 'instagram_handle', label: 'Instagram', type: 'text', placeholder: 'Instagram' },
  { name: 'tiktok_handle', label: 'TikTok', type: 'text', placeholder: 'TikTok' },
];
