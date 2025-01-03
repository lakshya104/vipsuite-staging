// import * as z from 'zod';

// export const vipStep2Schema = z
//   .object({
//     eventsEmail: z.string().email('Invalid email address').or(z.literal('')),
//     eventsSecondaryEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
//     eventsContactMeDirectly: z.boolean(),

//     stylistEmail: z.string().email('Invalid email address').or(z.literal('')),
//     stylistSecondaryEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
//     stylistContactMeDirectly: z.boolean(),

//     commercialOpportunitiesEmail: z.string().email('Invalid email address').or(z.literal('')),
//     commercialOpportunitiesSecondaryEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
//     commercialOpportunitiesContactMeDirectly: z.boolean(),
//   })
//   .refine((data) => data.eventsContactMeDirectly || data.eventsEmail !== '' || data.eventsSecondaryEmail !== '', {
//     path: ['eventsEmail'],
//     message: 'One Email is required if you do not want to be contacted directly for events.',
//   })
//   .refine((data) => data.eventsContactMeDirectly || data.eventsEmail !== '' || data.eventsSecondaryEmail !== '', {
//     path: ['eventsSecondaryEmail'],
//     message: 'One Email is required if you do not want to be contacted directly for events.',
//   })
//   .refine((data) => data.stylistContactMeDirectly || data.stylistEmail !== '' || data.stylistSecondaryEmail !== '', {
//     path: ['stylistEmail'],
//     message: 'Email is required if you do not want to be contacted directly for stylist.',
//   })
//   .refine((data) => data.stylistContactMeDirectly || data.stylistEmail !== '' || data.stylistSecondaryEmail !== '', {
//     path: ['stylistSecondaryEmail'],
//     message: 'Email is required if you do not want to be contacted directly for stylist.',
//   })
//   .refine(
//     (data) =>
//       data.commercialOpportunitiesContactMeDirectly ||
//       data.commercialOpportunitiesEmail !== '' ||
//       data.commercialOpportunitiesSecondaryEmail !== '',
//     {
//       path: ['commercialOpportunitiesEmail'],
//       message: 'One Email is required if you do not want to be contacted directly for commercial opportunities.',
//     },
//   )
//   .refine(
//     (data) =>
//       data.commercialOpportunitiesContactMeDirectly ||
//       data.commercialOpportunitiesEmail !== '' ||
//       data.commercialOpportunitiesSecondaryEmail !== '',
//     {
//       path: ['commercialOpportunitiesSecondaryEmail'],
//       message: 'One Email is required if you do not want to be contacted directly for commercial opportunities.',
//     },
//   );

// export type FormValues = z.infer<typeof vipStep2Schema>;

import * as z from 'zod';

export const vipStep2Schema = z
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
    path: ['eventsContactMeDirectly'], // Attach error to the first email field
    message: 'At least one valid email is required if you do not want to be contacted directly for events.',
  })
  .refine((data) => data.stylistContactMeDirectly || data.stylistEmail !== '' || data.stylistSecondaryEmail !== '', {
    path: ['stylistContactMeDirectly'], // Attach error to the first email field
    message: 'At least one valid email is required if you do not want to be contacted directly for stylist.',
  })
  .refine(
    (data) =>
      data.commercialOpportunitiesContactMeDirectly ||
      data.commercialOpportunitiesEmail !== '' ||
      data.commercialOpportunitiesSecondaryEmail !== '',
    {
      path: ['commercialOpportunitiesContactMeDirectly'], // Attach error to the first email field
      message:
        'At least one valid email is required if you do not want to be contacted directly for commercial opportunities.',
    },
  );

export type FormValues = z.infer<typeof vipStep2Schema>;
