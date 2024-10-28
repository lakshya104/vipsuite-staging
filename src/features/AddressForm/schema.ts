import * as z from 'zod';
import {
  addressValidationOne,
  addressValidationTwo,
  cityValidation,
  companyValidation,
  countryValidation,
  firstNameValidation,
  lastNameValidation,
  phoneValidation,
  postcodeValidation,
  stateValidation,
} from '@/helpers/validations';

export const formSchema = z.object({
  first_name: firstNameValidation,
  last_name: lastNameValidation,
  address_line_1: addressValidationOne,
  address_line_2: addressValidationTwo,
  city: cityValidation,
  postcode: postcodeValidation,
  state: stateValidation,
  country: countryValidation,
  phone: phoneValidation,
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
    name: 'state',
    placeholder: 'State',
  },
  {
    name: 'country',
    placeholder: 'Country',
  },
  {
    name: 'postcode',
    placeholder: 'Postcode',
  },
  {
    name: 'phone',
    placeholder: 'Phone',
  },
  {
    name: 'company',
    placeholder: 'Company',
  },
];
