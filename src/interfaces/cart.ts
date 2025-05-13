import { Question } from './events';

export interface Cart {
  items: CartItem[];
  totals: CartTotals;
  shipping_address: Address;
  billing_address: BillingAddress;
  needs_payment: boolean;
  needs_shipping: boolean;
  payment_requirements: string[];
  has_calculated_shipping: boolean;
  shipping_rates: ShippingRate[];
  items_count: number;
  items_weight: number;
  extensions: Record<string, unknown>;
}

interface CartItem {
  key: string;
  id: number;
  type: string;
  quantity: number;
  image_url?: string;
  name: string;
  brand_name: string;
  is_high_end_item: boolean;
  variation: Variation[];
  questions?: Question[];
  opportunity_id: string;
  opportunity_name: string;
}
interface Variation {
  attribute: string;
  value: string;
}

interface CartTotals {
  total_items: string;
  total_items_tax: string;
  total_fees: string;
  total_fees_tax: string;
  total_discount: string;
  total_discount_tax: string;
  total_shipping: string;
  total_shipping_tax: string;
  total_price: string;
  total_tax: string;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

interface Address {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
}

interface BillingAddress extends Address {
  email: string;
}

interface ShippingRate {
  package_id: number;
  name: string;
  destination: Omit<Address, 'first_name' | 'last_name' | 'company' | 'phone'>;
  items: {
    key: string;
    name: string;
    quantity: number;
  }[];
  shipping_rates: {
    rate_id: string;
    name: string;
    description: string;
    delivery_time: string;
    price: string;
    taxes: string;
    instance_id: number;
    method_id: string;
    meta_data: {
      key: string;
      value: string;
    }[];
    selected: boolean;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
  }[];
}
