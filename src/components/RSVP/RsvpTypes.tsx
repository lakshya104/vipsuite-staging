import { z } from 'zod';

export const RsvpFormSchema = z.object({
  notAvailable: z.string().nullable(),
  notInterested: z.string().nullable(),
});

export type RsvpFormValues = z.infer<typeof RsvpFormSchema>;

export const defaultValues: RsvpFormValues = {
  notAvailable: null,
  notInterested: null,
};
