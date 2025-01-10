import {
  companyRequiredValidation,
  jobTitleValidation,
  nameValidation,
  requiredEmailValidation,
  roleValidation,
} from '@/helpers/validations';
import * as z from 'zod';

export const BookDemoSchema = z.object({
  role: roleValidation,
  name: nameValidation,
  email: requiredEmailValidation,
  company: companyRequiredValidation,
  jobTitle: jobTitleValidation,
});

export const defaultValues = {
  role: '',
  name: '',
  email: '',
  company: '',
  jobTitle: '',
};
