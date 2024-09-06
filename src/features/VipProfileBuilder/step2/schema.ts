import * as z from 'zod';

export const vipStep2Schema = z.object({
  eventsEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  eventsSecondaryEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  eventsContactMeDirectly: z.boolean().optional(),
  stylistEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  stylistSecondaryEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  stylistContactMeDirectly: z.boolean().optional(),
  giftingEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  giftingSecondaryEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  giftingContactMeDirectly: z.boolean().optional(),
});

export type FormValues = z.infer<typeof vipStep2Schema>;
