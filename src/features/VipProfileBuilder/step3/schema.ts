import * as z from 'zod';
import {
  ageOfChildValidation,
  birthplaceValidation,
  cityValidation,
  dateOfBirthValidation,
  ethnicityValidation,
  genderOfChildValidation,
  genderValidation,
  homePostcodeValidation,
  nationalityValidation,
  numberOfChildrenValidation,
  petsValidation,
} from '@/helpers/validations';

export const formSchema = z.object({
  dateOfBirth: dateOfBirthValidation,
  birthplace: birthplaceValidation,
  gender: genderValidation,
  nationality: nationalityValidation,
  city: cityValidation,
  ethnicity: ethnicityValidation,
  numberOfChildren: numberOfChildrenValidation,
  ageOfChild: ageOfChildValidation,
  genderOfChild: genderOfChildValidation,
  pets: petsValidation,
  homePostcode: homePostcodeValidation,
});

export type Step3FormValues = z.infer<typeof formSchema>;
