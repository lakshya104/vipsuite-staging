import * as z from 'zod';
import {
  addressValidationOne,
  addressValidationTwo,
  cityValidation,
  companyValidation,
  countryValidation,
  firstNameValidation,
  lastNameValidation,
  phoneRequiredValidation,
  homePostcodeValidation,
  regionValidation,
} from '@/helpers/validations';
import { QuestionType } from '@/helpers/enums';

export const formSchema = z.object({
  first_name: firstNameValidation,
  last_name: lastNameValidation,
  address_line_1: addressValidationOne,
  address_line_2: addressValidationTwo,
  city: cityValidation,
  postcode: homePostcodeValidation,
  region: regionValidation,
  country: countryValidation,
  phone: phoneRequiredValidation,
  company: companyValidation,
});

export type AddAddressFormValue = {
  first_name: string;
  last_name: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  postcode: string;
  state?: string;
  region?: string;
  country: string;
  phone: string;
  company?: string | undefined;
  country_code?: string;
};

export const addNewAddressField = [
  {
    name: 'first_name',
    placeholder: 'First Name',
    type: QuestionType.Text,
  },
  {
    name: 'last_name',
    placeholder: 'Last Name',
    type: QuestionType.Text,
  },
  {
    name: 'address_line_1',
    placeholder: 'Address Line 1',
    type: QuestionType.Text,
  },
  {
    name: 'address_line_2',
    placeholder: 'Address Line 2',
    type: QuestionType.Text,
  },
  {
    name: 'city',
    placeholder: 'City',
    type: QuestionType.Text,
  },
  {
    name: 'postcode',
    placeholder: 'Postcode',
    type: QuestionType.Text,
  },
  {
    name: 'region',
    placeholder: 'Region',
    type: QuestionType.Text,
  },
  {
    name: 'country',
    placeholder: 'Country',
    type: QuestionType.Dropdown,
  },
  {
    name: 'phone',
    placeholder: 'Phone',
    type: QuestionType.Text,
  },
];
