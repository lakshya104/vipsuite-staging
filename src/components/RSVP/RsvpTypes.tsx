import { z } from 'zod';

export const RsvpFormSchema = z
  .object({
    adultsChildren: z.string().nullable(),
    eventTitle: z.string().nullable(),
    notAvailable: z.string().nullable(),
    notInterested: z.string().nullable(),
  })
  .refine(
    (data) => {
      if (data.notAvailable !== 'yes' && data.notInterested !== 'yes' && data.eventTitle === '') {
        return data.adultsChildren && data.eventTitle;
      }
      return true;
    },
    {
      message: 'This fields is required.',
      path: ['eventTitle'],
    },
  )
  .refine(
    (data) => {
      if (data.notAvailable !== 'yes' && data.notInterested !== 'yes' && data.adultsChildren === '') {
        return data.adultsChildren && data.eventTitle;
      }
      return true;
    },
    {
      message: 'This fields is required.',
      path: ['adultsChildren'],
    },
  );

export type RsvpFormValues = z.infer<typeof RsvpFormSchema>;

export const defaultValues: RsvpFormValues = {
  adultsChildren: '',
  eventTitle: '',
  notAvailable: null,
  notInterested: null,
};
