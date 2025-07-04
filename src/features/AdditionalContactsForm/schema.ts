import * as z from 'zod';

export const additionalContactsFormSchema = z
  .object({
    eventsEmail: z.string().email('Invalid email address').or(z.literal('')),
    eventsSecondaryEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
    eventsContactMeDirectly: z.boolean(),

    stylistEmail: z.string().email('Invalid email address').or(z.literal('')),
    stylistSecondaryEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
    stylistContactMeDirectly: z.boolean(),

    commercialOpportunitiesEmail: z.string().email('Invalid email address').or(z.literal('')),
    commercialOpportunitiesSecondaryEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
    commercialOpportunitiesContactMeDirectly: z.boolean(),
  })
  .refine((data) => data.eventsContactMeDirectly || data.eventsEmail !== '' || data.eventsSecondaryEmail !== '', {
    path: ['eventsContactMeDirectly'],
    message: 'At least one valid email is required if you do not want to be contacted directly for events.',
  })
  .refine((data) => data.stylistContactMeDirectly || data.stylistEmail !== '' || data.stylistSecondaryEmail !== '', {
    path: ['stylistContactMeDirectly'],
    message: 'At least one valid email is required if you do not want to be contacted directly for stylist.',
  })
  .refine(
    (data) =>
      data.commercialOpportunitiesContactMeDirectly ||
      data.commercialOpportunitiesEmail !== '' ||
      data.commercialOpportunitiesSecondaryEmail !== '',
    {
      path: ['commercialOpportunitiesContactMeDirectly'],
      message:
        'At least one valid email is required if you do not want to be contacted directly for commercial opportunities.',
    },
  );

export type FormValues = z.infer<typeof additionalContactsFormSchema>;
