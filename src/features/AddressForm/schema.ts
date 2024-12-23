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
  stateValidation,
} from '@/helpers/validations';

export const formSchema = z.object({
  first_name: firstNameValidation,
  last_name: lastNameValidation,
  address_line_1: addressValidationOne,
  address_line_2: addressValidationTwo,
  city: cityValidation,
  postcode: homePostcodeValidation,
  state: stateValidation,
  country: countryValidation,
  phone: phoneRequiredValidation,
  company: companyValidation,
});

export type AddAddressFormValue = z.infer<typeof formSchema>;

export const addNewAddressField = [
  {
    name: 'first_name',
    placeholder: 'First Name',
  },
  {
    name: 'last_name',
    placeholder: 'Last Name',
  },
  {
    name: 'address_line_1',
    placeholder: 'Address Line 1',
  },
  {
    name: 'address_line_2',
    placeholder: 'Address Line 2',
  },
  {
    name: 'city',
    placeholder: 'City',
  },
  {
    name: 'postcode',
    placeholder: 'Postcode',
  },
  {
    name: 'state',
    placeholder: 'State',
  },
  {
    name: 'country',
    placeholder: 'Country',
  },
  {
    name: 'phone',
    placeholder: 'Phone',
  },
];
