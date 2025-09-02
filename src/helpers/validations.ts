import { z } from 'zod';
import en from './lang';

export const passwordValidation = z
  .string()
  .min(1, { message: en.signup.errorMessage.requiredPassword })
  .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/, {
    message: en.signup.errorMessage.passwordValidation,
  });

export const phoneValidation = z
  .string()
  .regex(/^\+[1-9]\d{1,14}$/, {
    message: en.signup.errorMessage.phoneValidation,
  })
  .min(11, { message: en.signup.errorMessage.phoneValidation })
  .max(15, { message: en.signup.errorMessage.phoneValidation })
  .optional()
  .or(z.literal(''));

export const phoneRequiredValidation = z
  .string()
  .regex(/^\+[1-9]\d{1,14}$/, {
    message: en.signup.errorMessage.phoneValidation,
  })
  .min(11, { message: en.signup.errorMessage.phoneValidation })
  .max(15, { message: en.signup.errorMessage.phoneValidation });

export const optionalEmailValidation = z
  .string()
  .email({ message: en.signup.errorMessage.email })
  .optional()
  .or(z.literal(''));

export const requiredEmailValidation = z
  .string()
  .min(1, { message: en.signup.errorMessage.email })
  .email({ message: en.signup.errorMessage.requiredEmail });

export const firstNameValidation = z
  .string()
  .trim()
  .min(1, { message: en.signup.errorMessage.firstNameRequired })
  .refine((value) => value.length > 0, {
    message: en.signup.errorMessage.firstNameRequired,
  });

export const lastNameValidation = z
  .string()
  .trim()
  .min(1, { message: en.signup.errorMessage.lastNameRequired })
  .refine((value) => value.length > 0, {
    message: en.signup.errorMessage.lastNameRequired,
  });

export const instagramValidationRequired = z.string().min(1, { message: en.signup.errorMessage.instagramRequired });

export const tiktokValidationRequired = z.string().min(1, { message: en.signup.errorMessage.tiktokRequired });

export const instagramValidation = z.string().optional().or(z.literal(''));

export const tiktokValidation = z.string().optional().or(z.literal(''));

export const codeValidation = z.string().min(1, { message: en.signup.errorMessage.code });

export const addressValidationOne = z.string().min(1, { message: en.address.errorMessage.addressLineOneRequired });

export const addressValidationTwo = z.string().min(1, { message: en.address.errorMessage.addressLineTwoRequired });

export const cityValidation = z.string().min(1, { message: en.address.errorMessage.cityRequired });

export const postcodeValidation = z.string().min(1, { message: en.address.errorMessage.postcodeRequired });

export const stateValidation = z.string();

export const countryValidation = z.string().min(1, { message: en.address.errorMessage.countryRequired });

export const companyValidation = z.string().optional().or(z.literal(''));

export const vipManagedValidation = z.string().min(1, { message: en.signup.errorMessage.exampleOfVip });

export const vipExamplesValidation = z
  .array(
    z.object({
      value: z.string().min(1, { message: en.signup.errorMessage.exampleOfVip }),
    }),
  )
  .optional();

export const typeOfRepresentationValidation = z
  .string()
  .min(1, { message: en.profileBuilder.addVip.errorMessage.representationType });

export const averageEngagementValidation = z.string().optional().or(z.literal(''));

export const typeOfBusinessValidation = z.string().min(2, {
  message: en.signup.errorMessage.typeOfBusiness,
});

export const brandNameValidation = z.string().min(2, {
  message: en.signup.errorMessage.brandName,
});

export const contactFirstNameValidation = z.string().min(2, {
  message: en.signup.errorMessage.contactFirstName,
});

export const contactLastNameValidation = z.string().min(2, {
  message: en.signup.errorMessage.contactLastName,
});

export const loginPasswordValidation = z.string().min(1, {
  message: 'Password is required',
});

export const interestValidation = z.array(z.string()).min(1, { message: 'Please select one option' });

export const typeOfContentValidation = z
  .array(z.string())
  .min(1, { message: 'Please select one content creation type' });

export const dateOfBirthValidation = z
  .string()
  .min(1, { message: en.profileBuilder.yourDetails.errorMessage.dob })
  .refine(
    (value) => {
      if (!value) return false;
      const today = new Date();
      const selectedDate = new Date(value);
      return selectedDate <= today;
    },
    { message: en.common.future },
  );

export const birthplaceValidation = z
  .string()
  .min(1, { message: en.profileBuilder.yourDetails.errorMessage.birthplace });

export const nationalityValidation = z
  .string()
  .min(1, { message: en.profileBuilder.yourDetails.errorMessage.nationality });

export const ethnicityValidation = z.string().min(1, { message: en.profileBuilder.yourDetails.errorMessage.ethnicity });

export const numberOfChildrenValidation = z
  .string()
  .min(1, { message: en.profileBuilder.yourDetails.errorMessage.child });

export const ageOfChildValidation = z.array(
  z
    .string()
    .min(1, { message: en.profileBuilder.yourDetails.errorMessage.ageOfChild })
    .refine(
      (value) => {
        if (!value) return false;
        const today = new Date();
        const selectedDate = new Date(value);
        return selectedDate <= today;
      },
      { message: en.common.future },
    ),
);

export const genderOfChildValidation = z.array(
  z.string().min(1, { message: en.profileBuilder.yourDetails.errorMessage.genderOfChild }),
);

export const petsValidation = z.array(z.string());

export const homePostcodeValidation = z
  .string()
  .regex(/^[A-Za-z0-9\s-]{3,10}$/, { message: en.profileBuilder.yourDetails.errorMessage.homePostcode });

export const sportsPlayValidation = z.string().optional().or(z.literal(''));

export const sportsValidation = z.string();

export const sportsFollowValidation = z
  .string()
  .min(1, { message: en.profileBuilder.typeOfContent.errorMessage.sportsFollow });

export const skillsValidation = z.string().min(1, { message: en.profileBuilder.typeOfContent.errorMessage.skills });

export const socialLookValidation = z
  .string()
  .min(1, { message: en.profileBuilder.typeOfContent.errorMessage.lookFeelOfSocials });

export const habitsValidation = z
  .array(z.string())
  .min(1, { message: en.profileBuilder.typeOfContent.errorMessage.habits });

export const nameValidation = z
  .string()
  .trim()
  .min(1, { message: en.landingForm.errorMessage.nameRequired })
  .refine((value) => value.length > 0, {
    message: en.landingForm.errorMessage.nameRequired,
  });

export const companyRequiredValidation = z
  .string()
  .trim()
  .min(1, { message: en.landingForm.errorMessage.companyRequired })
  .refine((value) => value.length > 0, {
    message: en.landingForm.errorMessage.companyRequired,
  });

export const jobTitleValidation = z
  .string()
  .trim()
  .min(1, { message: en.landingForm.errorMessage.jobTitleRequired })
  .refine((value) => value.length > 0, {
    message: en.landingForm.errorMessage.jobTitleRequired,
  });

export const roleValidation = z.string().min(1, { message: en.landingForm.errorMessage.roleRequired });

export const genderValidation = z.string().min(1, { message: 'Gender is required' });

export const MessageBoxValidation = z.string().trim().min(1, { message: en.messageDetail.fieldErrMessage });
