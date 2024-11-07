export type OrderFeedbackData = {
  social_media_post_url: string;
  screenshot: string | null;
};

export type EventFeedbackData = {
  social_media_post_url: string;
  screenshot: string | null;
  rating: number | undefined;
};

export type MetaData = {
  key: string;
  value?: string | null;
};

export type OrderLineItem = {
  product_id: number;
  quantity: number;
};

export type OrderAddress = {
  first_name?: string;
  last_name?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  phone?: string;
};

export type ShippingLine = {
  method_id: string;
  method_title: string;
  total: string;
};

export type CreateOrderData = {
  status?: string;
  meta_data?: MetaData[];
  set_paid: boolean;
  billing: OrderAddress & { email: string };
  shipping: OrderAddress;
  line_items?: OrderLineItem[];
  shipping_lines: ShippingLine[];
};
