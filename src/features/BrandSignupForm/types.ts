import * as z from 'zod';
import {
  brandNameValidation,
  contactFirstNameValidation,
  contactLastNameValidation,
  passwordValidation,
  phoneValidation,
  requiredEmailValidation,
  typeOfBusinessValidation,
} from '@/helpers/validations';

export const BrandSignupSchema = z.object({
  brand_name: brandNameValidation,
  first_name: contactFirstNameValidation,
  last_name: contactLastNameValidation,
  email: requiredEmailValidation,
  phone: phoneValidation,
  password: passwordValidation,
  type_of_business: typeOfBusinessValidation,
});

export interface BrandSignupValues {
  brand_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  type_of_business: string;
}

export const defaultValues = {
  brand_name: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: '',
  type_of_business: '',
};
