import * as z from 'zod';

export const formSchema = z.object({
  sportsPlay: z.string().min(1, 'Sports Play is required'),
  sports: z.string().min(1, 'Sports is required'),
  sportsFollow: z.string().min(1, 'Sports Follow is required'),
  skills: z.string().min(1, 'Skills is required'),
  socialLook: z.string().min(1, 'Social Look is required'),
  interests: z.array(z.string()).optional(),
});

export type Step3FormValues = z.infer<typeof formSchema>;

export const defaultValues = {
  sportsPlay: '',
  sports: '',
  sportsFollow: '',
  skills: '',
  socialLook: '',
  interests: [],
};
