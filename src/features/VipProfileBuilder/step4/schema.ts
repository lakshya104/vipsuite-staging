import * as z from 'zod';
import {
  habitsValidation,
  skillsValidation,
  socialLookValidation,
  sportsFollowValidation,
  sportsPlayValidation,
  sportsValidation,
} from '@/helpers/validations';

export const formSchema = z.object({
  sportsPlay: sportsPlayValidation,
  sports: sportsValidation,
  sportsFollow: sportsFollowValidation,
  skills: skillsValidation,
  socialLook: socialLookValidation,
  habits: habitsValidation,
});

export type Step4FormValues = z.infer<typeof formSchema>;
