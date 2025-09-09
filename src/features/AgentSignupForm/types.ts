import * as z from 'zod';
import {
  companyValidation,
  firstNameValidation,
  lastNameValidation,
  passwordValidation,
  phoneValidation,
  requiredEmailValidation,
  // vipExamplesValidation,
  // vipManagedValidation,
} from '@/helpers/validations';

export const AgentSignupSchema = z.object({
  first_name: firstNameValidation,
  last_name: lastNameValidation,
  email: requiredEmailValidation,
  password: passwordValidation,
  phone: phoneValidation,
  company_name: companyValidation,
  // examples_of_vip_managed: vipManagedValidation,
  // vip_examples: vipExamplesValidation,
});

export interface AgentSignupValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  company_name: string;
  examples_of_vip_managed: string;
  vip_examples: { value: string }[];
}

export const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  phone: '',
  company_name: '',
  // examples_of_vip_managed: '',
};
