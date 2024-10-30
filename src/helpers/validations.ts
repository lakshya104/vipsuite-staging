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
  .regex(/^\+?([1-9]\d?)\d{10}$/, {
    message: en.signup.errorMessage.phoneValidation,
  })
  .min(11, { message: en.signup.errorMessage.phoneValidation })
  .max(15, { message: en.signup.errorMessage.phoneValidation })
  .optional()
  .or(z.literal(''));

export const phoneRequiredValidation = z
  .string()
  .regex(/^\+?([1-9]\d?)\d{10}$/, {
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

export const firstNameValidation = z.string().min(1, { message: en.signup.errorMessage.firstNameRequired }).min(3, {
  message: en.signup.errorMessage.firstName,
});

export const lastNameValidation = z.string().min(1, { message: en.signup.errorMessage.lastNameRequired }).min(3, {
  message: en.signup.errorMessage.lastName,
});

export const instagramValidation = z.string().min(1, { message: en.signup.errorMessage.instagramRequired }).min(3, {
  message: en.signup.errorMessage.instagramInvalid,
});

export const tiktokValidation = z.string().min(1, { message: en.signup.errorMessage.tiktokRequired }).min(3, {
  message: en.signup.errorMessage.tiktokInvalid,
});

export const codeValidation = z.string().min(1, { message: en.signup.errorMessage.code });

export const addressValidationOne = z.string().min(1, { message: en.address.errorMessage.addressLineOneRequired });

export const addressValidationTwo = z.string().min(1, { message: en.address.errorMessage.addressLineTwoRequired });

export const cityValidation = z.string().min(1, { message: en.address.errorMessage.cityRequired });

export const postcodeValidation = z.string().min(1, { message: en.address.errorMessage.postcodeRequired });

export const stateValidation = z.string().min(1, { message: en.address.errorMessage.stateRequired });

export const countryValidation = z.string().min(1, { message: en.address.errorMessage.countryRequired });

export const companyValidation = z
  .string()
  .min(4, { message: en.signup.errorMessage.companyName })
  .optional()
  .or(z.literal(''));

export const vipManagedValidation = z.string().min(3, { message: en.signup.errorMessage.exampleOfVip });

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

export const averageEngagementValidation = z
  .string()
  .min(1, { message: en.profileBuilder.addVip.errorMessage.engagement });

export const typeOfBusinessValidation = z.string().min(2, {
  message: en.signup.errorMessage.typeOfBusiness,
});

export const brandNameValidation = z.string().min(2, {
  message: en.signup.errorMessage.brandName,
});

export const contactNameValidation = z.string().min(2, {
  message: en.signup.errorMessage.companyName,
});

export const loginPasswordValidation = z
  .string()
  .min(1, {
    message: 'Password is required',
  })
  .min(6, {
    message: 'Password must be at least 6 characters',
  });

export const interestValidation = z.array(z.string()).min(1, { message: 'Please select one option' });

export const typeOfContentValidation = z
  .array(z.string())
  .min(1, { message: 'Please select one content creation type' });

export const dateOfBirthValidation = z.string().min(1, { message: en.profileBuilder.yourDetails.errorMessage.dob });

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
  z.string().min(1, { message: en.profileBuilder.yourDetails.errorMessage.ageOfChild }),
);

export const genderOfChildValidation = z.array(
  z.string().min(1, { message: en.profileBuilder.yourDetails.errorMessage.genderOfChild }),
);

export const petsValidation = z.string().min(1, { message: en.profileBuilder.yourDetails.errorMessage.pets });

export const homePostcodeValidation = z
  .string()
  .min(1, { message: en.profileBuilder.yourDetails.errorMessage.homePostcode });

export const sportsPlayValidation = z
  .string()
  .min(1, { message: en.profileBuilder.typeOfContent.errorMessage.sportsPlay });

export const sportsValidation = z
  .string()
  .min(1, { message: en.profileBuilder.typeOfContent.errorMessage.otherSports });

export const sportsFollowValidation = z
  .string()
  .min(1, { message: en.profileBuilder.typeOfContent.errorMessage.sportsFollow });

export const skillsValidation = z.string().min(1, { message: en.profileBuilder.typeOfContent.errorMessage.skills });

export const socialLookValidation = z
  .string()
  .min(1, { message: en.profileBuilder.typeOfContent.errorMessage.lookFeelOfSocials });

export const habitsValidation = z.array(
  z.string().min(1, { message: en.profileBuilder.typeOfContent.errorMessage.contentType }),
);
