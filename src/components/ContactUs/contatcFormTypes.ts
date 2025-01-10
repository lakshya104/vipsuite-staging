import {
  companyRequiredValidation,
  jobTitleValidation,
  nameValidation,
  phoneRequiredValidation,
  requiredEmailValidation,
  roleValidation,
} from '@/helpers/validations';
import * as z from 'zod';

export const ContactUsSchema = z.object({
  role: roleValidation,
  name: nameValidation,
  email: requiredEmailValidation,
  company: companyRequiredValidation,
  jobTitle: jobTitleValidation,
  phone: phoneRequiredValidation,
});

export const defaultValues = {
  role: '',
  name: '',
  email: '',
  company: '',
  jobTitle: '',
  phone: '',
};
