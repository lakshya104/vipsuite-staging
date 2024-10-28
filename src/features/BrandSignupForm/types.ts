import * as z from 'zod';
import {
  brandNameValidation,
  contactNameValidation,
  passwordValidation,
  phoneValidation,
  requiredEmailValidation,
  typeOfBusinessValidation,
} from '@/helpers/validations';

export const BrandSignupSchema = z.object({
  brand_name: brandNameValidation,
  contact_name: contactNameValidation,
  email: requiredEmailValidation,
  phone: phoneValidation,
  password: passwordValidation,
  type_of_business: typeOfBusinessValidation,
});

export interface BrandSignupValues {
  brand_name: string;
  contact_name: string;
  email: string;
  phone: string;
  password: string;
  type_of_business: string;
}

export const defaultValues = {
  brand_name: '',
  contact_name: '',
  email: '',
  phone: '',
  password: '',
  type_of_business: '',
};
