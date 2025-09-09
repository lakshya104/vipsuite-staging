import { Question } from './events';
import { ImageSizes } from './opportunitiesDetails';

export interface Order {
  id: number;
  parent_id: number;
  status: string;
  currency: string;
  version: string;
  prices_include_tax: boolean;
  date_created: string;
  date_modified: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  customer_id: number;
  order_key: string;
  billing: Address;
  shipping: Address;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  customer_ip_address: string;
  customer_user_agent: string;
  created_via: string;
  customer_note: string;
  date_completed: string | null;
  date_paid: string;
  cart_hash: string;
  number: string;
  meta_data: MetaData[];
  line_items: LineItem[];
  tax_lines: TaxLine[];
  shipping_lines: ShippingLine[];
  fee_lines: FeeLine[];
  coupon_lines: CouponLine[];
  refunds: Refund[];
  payment_url: string;
  is_editable: boolean;
  needs_payment: boolean;
  needs_processing: boolean;
  date_created_gmt: string;
  date_modified_gmt: string;
  date_completed_gmt: string | null;
  date_paid_gmt: string;
  currency_symbol: string;
  _links: Links;
  is_feedback_provided: boolean;
  opportunity?: {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    location: string;
    image: {
      sizes: ImageSizes;
    };
  };
  event?: {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    location: string;
    image: {
      sizes: ImageSizes;
    };
  };
  order_created_for: string;
  tracking_url?: string;
  questions?: Question[];
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
  email?: string;
  phone?: string;
}

interface MetaData {
  id: number;
  key: string;
  value: string;
  display_key?: string;
  display_value?: string;
}

export interface LineItem {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  taxes: unknown;
  meta_data: MetaData[];
  sku: string;
  price: number;
  image: Image;
  brand_name: string;
  parent_name: string | null;
}

interface Image {
  id: string | number;
  src: string;
}

interface TaxLine {
  id: number;
  rate_code: string;
  rate_id: number;
  label: string;
  compound: boolean;
  tax_total: string;
  shipping_tax_total: string;
  meta_data: MetaData[];
}

interface ShippingLine {
  id: number;
  method_title: string;
  method_id: string;
  instance_id: string;
  total: string;
  total_tax: string;
  taxes: unknown;
  meta_data: MetaData[];
}

interface FeeLine {
  id: number;
  name: string;
  tax_class: string;
  tax_status: string;
  amount: string;
  total: string;
  total_tax: string;
  taxes: unknown;
  meta_data: MetaData[];
}

interface CouponLine {
  id: number;
  code: string;
  discount: string;
  discount_tax: string;
  meta_data: MetaData[];
}

interface Refund {
  id: number;
  reason: string;
  total: string;
}

interface Links {
  self: Link[];
  collection: Link[];
}

interface Link {
  href: string;
}
