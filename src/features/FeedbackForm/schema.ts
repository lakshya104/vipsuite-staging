import en from '@/helpers/lang';
import { z } from 'zod';

export const orderFeedbackSchema = z.object({
  socialPostUrl: z.string().url(en.feedbackForm.fieldErrorMessages.url),
  screenshot: z
    .custom<File>((val) => val instanceof File || !val)
    .refine((val) => val instanceof File, {
      message: en.feedbackForm.fieldErrorMessages.screesshot,
    }),
});

export const eventFeedbackSchema = z.object({
  rating: z.number().min(1, en.feedbackForm.fieldErrorMessages.rating),
  socialPostUrl: z.string().url(en.feedbackForm.fieldErrorMessages.url),
  screenshot: z
    .custom<File>((val) => val instanceof File || !val)
    .refine((val) => val instanceof File, {
      message: en.feedbackForm.fieldErrorMessages.screesshot,
    }),
});

export type OrderFeedbackFormValues = z.infer<typeof orderFeedbackSchema>;
export type EventFeedbackFormValues = z.infer<typeof eventFeedbackSchema>;

export type FeedbackFormValues = OrderFeedbackFormValues | EventFeedbackFormValues;

export const defaultOrderValues: OrderFeedbackFormValues = {
  socialPostUrl: '',
  screenshot: undefined as unknown as File,
};

export const defaultEventValues: EventFeedbackFormValues = {
  rating: 0,
  socialPostUrl: '',
  screenshot: undefined as unknown as File,
};
