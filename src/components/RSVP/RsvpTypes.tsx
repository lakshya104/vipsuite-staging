import { z } from 'zod';

export const RsvpFormSchema = z
  .object({
    adultsChildren: z.string().nullable(),
    eventTitle: z.string().nullable(),
    notAvailable: z.string().nullable(),
    notInterested: z.string().nullable(),
  })
  .refine(
    (data) =>
      data.notAvailable !== 'yes' || data.notInterested !== 'yes' ? data.adultsChildren && data.eventTitle : true,
    {
      message: "adultsChildren and eventTitle are required if notAvailable or notInterested is not 'yes'.",
      path: ['adultsChildren', 'eventTitle'],
    },
  );

export type RsvpFormValues = z.infer<typeof RsvpFormSchema>;

export const defaultValues: RsvpFormValues = {
  adultsChildren: '',
  eventTitle: '',
  notAvailable: null,
  notInterested: null,
};
