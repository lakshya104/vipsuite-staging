import * as z from 'zod';

export const formSchema = z.object({
  firstName: z.string().min(1, { message: 'First Name is required' }),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
  typeOfRepresentation: z.string().min(1, { message: 'Type of Representation is required' }),
  instagram: z.string().min(1, { message: 'Instagram is required' }),
  tiktok: z.string().min(1, { message: 'TikTok is required' }),
  averageEngagement: z.string().min(1, { message: 'Average Engagement is required' }),
});

export type AgentFormValues = z.infer<typeof formSchema>;

export const representationType = [
  { value: 'football', label: 'Football' },
  { value: 'basketball', label: 'Basketball' },
  { value: 'cricket', label: 'Cricket' },
];

export const agentFields = [
  { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'First Name' },
  { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Last Name' },
  {
    name: 'typeOfRepresentation',
    label: 'Type of Representation',
    type: 'select',
    placeholder: 'Type of Representation',
  },
  { name: 'instagram', label: 'Instagram', type: 'text', placeholder: 'Instagram' },
  { name: 'tiktok', label: 'TikTok', type: 'text', placeholder: 'TikTok' },
];
