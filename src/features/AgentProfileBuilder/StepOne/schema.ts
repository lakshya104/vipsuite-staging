import * as z from 'zod';

export const formSchema = z.object({
  first_name: z.string().min(1, { message: 'First Name is required' }),
  last_name: z.string().min(1, { message: 'Last Name is required' }),
  type_of_representation: z.string().min(1, { message: 'Type of Representation is required' }),
  instagram_handle: z.string().min(1, { message: 'Instagram is required' }),
  tiktok_handle: z.string().min(1, { message: 'TikTok is required' }),
  avg_engagement: z.string().min(1, { message: 'Average Engagement is required' }),
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
