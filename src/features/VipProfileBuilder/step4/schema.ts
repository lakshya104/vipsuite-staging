import * as z from 'zod';

export const formSchema = z.object({
  sportsPlay: z.string().optional().or(z.literal('')),
  sports: z.string().optional().or(z.literal('')),
  sportsFollow: z.string().optional().or(z.literal('')),
  skills: z.string().optional().or(z.literal('')),
  socialLook: z.string().optional().or(z.literal('')),
  habits: z.array(z.string()).optional(),
});

export type Step4FormValues = z.infer<typeof formSchema>;
