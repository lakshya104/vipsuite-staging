import * as z from 'zod';

export const formSchema = z.object({
  sportsPlay: z.string().min(1, 'Sports you play is required'),
  sports: z.string().min(1, 'Sports is required'),
  sportsFollow: z.string().min(1, 'Sports you follow is required'),
  skills: z.string().min(1, 'Skills is required'),
  socialLook: z.string().min(1, 'Look and feel of your socials is required'),
  habits: z.array(z.string()).min(1, 'At least one habit is required'),
});

export type Step4FormValues = z.infer<typeof formSchema>;
