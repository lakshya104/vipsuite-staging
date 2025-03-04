import * as z from 'zod';
import {
  brandNameValidation,
  firstNameValidation,
  lastNameValidation,
  phoneValidation,
  typeOfBusinessValidation,
} from '@/helpers/validations';

export const BrandEditProfileSchema = z.object({
  first_name: firstNameValidation,
  last_name: lastNameValidation,
  phone: phoneValidation,
  brand_name: brandNameValidation,
  type_of_business: typeOfBusinessValidation,
});

export interface BrandEditProfileValues {
  first_name: string;
  last_name: string;
  phone: string;
  brand_name: string;
  type_of_business: string;
}
