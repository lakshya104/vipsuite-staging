import * as z from 'zod';
import {
  ageOfChildValidation,
  birthplaceValidation,
  dateOfBirthValidation,
  ethnicityValidation,
  genderOfChildValidation,
  homePostcodeValidation,
  nationalityValidation,
  numberOfChildrenValidation,
  petsValidation,
} from '@/helpers/validations';

export const formSchema = z.object({
  dateOfBirth: dateOfBirthValidation,
  birthplace: birthplaceValidation,
  nationality: nationalityValidation,
  ethnicity: ethnicityValidation,
  numberOfChildren: numberOfChildrenValidation,
  ageOfChild: ageOfChildValidation,
  genderOfChild: genderOfChildValidation,
  pets: petsValidation,
  homePostcode: homePostcodeValidation,
});

export type Step3FormValues = z.infer<typeof formSchema>;
