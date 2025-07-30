export interface Address {
  unique_id: string;
  first_name: string;
  last_name: string;
  company?: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  postcode: string;
  state: string;
  country: string;
  phone: string;
}

export interface AddressInput {
  first_name: string;
  last_name: string;
  company?: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  postcode: string;
  state: string;
  country: string;
  phone?: string;
}

export interface ShippingCountry {
  code: string;
  name: string;
}
