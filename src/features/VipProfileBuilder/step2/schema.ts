import * as z from 'zod';

export const vipStep2Schema = z.object({
  eventsEmail: z.string().email('Invalid email address'),
  eventsSecondaryEmail: z.string().email('Invalid email address'),
  stylistEmail: z.string().email('Invalid email address'),
  stylistSecondaryEmail: z.string().email('Invalid email address'),
  giftingEmail: z.string().email('Invalid email address'),
  giftingSecondaryEmail: z.string().email('Invalid email address'),
});

export type FormValues = z.infer<typeof vipStep2Schema>;

export const defaultValues = {
  eventsEmail: '',
  eventsSecondaryEmail: '',
  stylistEmail: '',
  stylistSecondaryEmail: '',
  giftingEmail: '',
  giftingSecondaryEmail: '',
};
