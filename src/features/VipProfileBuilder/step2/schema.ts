import * as z from 'zod';

export const vipStep2Schema = z
  .object({
    eventsEmail: z.string().email('Invalid email address').or(z.literal('')),
    eventsSecondaryEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
    eventsContactMeDirectly: z.boolean(),

    stylistEmail: z.string().email('Invalid email address').or(z.literal('')),
    stylistSecondaryEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
    stylistContactMeDirectly: z.boolean(),

    giftingEmail: z.string().email('Invalid email address').or(z.literal('')),
    giftingSecondaryEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
    giftingContactMeDirectly: z.boolean(),
  })
  .refine((data) => data.eventsContactMeDirectly || data.eventsEmail !== '', {
    path: ['eventsEmail'],
    message: 'Email is required if you do not want to be contacted directly for events.',
  })
  .refine((data) => data.stylistContactMeDirectly || data.stylistEmail !== '', {
    path: ['stylistEmail'],
    message: 'Email is required if you do not want to be contacted directly for stylist.',
  })
  .refine((data) => data.giftingContactMeDirectly || data.giftingEmail !== '', {
    path: ['giftingEmail'],
    message: 'Email is required if you do not want to be contacted directly for commercial opportunities.',
  });

export type FormValues = z.infer<typeof vipStep2Schema>;
