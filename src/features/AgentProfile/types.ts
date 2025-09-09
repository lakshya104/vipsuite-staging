import * as z from 'zod';
import {
  companyValidation,
  firstNameValidation,
  lastNameValidation,
  phoneValidation,
  // vipExamplesValidation,
} from '@/helpers/validations';

export const AgentEditProfileSchema = z.object({
  first_name: firstNameValidation,
  last_name: lastNameValidation,
  phone: phoneValidation,
  company_name: companyValidation,
  // vip_examples: vipExamplesValidation,
});

export interface AgentEditProfileValues {
  first_name: string;
  last_name: string;
  phone: string;
  company_name: string;
  // examples_of_vip_managed?: string;
  // vip_examples: { value: string }[];
}
