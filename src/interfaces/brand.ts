import { EventImage } from './events';

export interface BrandDetails {
  id: number;
  date?: string;
  date_gmt?: string;
  guid?: {
    rendered: string;
  };
  modified?: string;
  modified_gmt?: string;
  slug?: string;
  status?: string;
  type?: string;
  link?: string;
  title: {
    rendered: string;
  };
  template?: string;
  brand_category?: number[];
  class_list?: string[];
  acf: {
    associated_brand: number;
    brand_name: string;
    contact_name: string;
    type_of_business: string;
    short_description: string;
    brand_image: EventImage;
  };
  _links: {
    self: Array<{
      href: string;
    }>;
    collection: Array<{
      href: string;
    }>;
    about: Array<{
      href: string;
    }>;
    acf_user: Array<{
      embeddable: boolean;
      href: string;
    }>;
    wp_attachment: Array<{
      href: string;
    }>;
    wp_term: Array<{
      taxonomy: string;
      embeddable: boolean;
      href: string;
    }>;
    curies: Array<{
      name: string;
      href: string;
      templated: boolean;
    }>;
  };
  _embedded?: {
    acfUser?: {
      code: string;
      message: string;
      data: {
        status: number;
      };
    }[];
  };
}

export interface BrandProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: string | null;
  date_on_sale_from_gmt: string | null;
  date_on_sale_to: string | null;
  date_on_sale_to_gmt: string | null;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  download_limit: number;
  download_expiry: number;
  external_url: string;
  button_text: string;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: number | null;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  low_stock_amount: number | null;
  sold_individually: boolean;
  weight: string;
  meta_data: ProductMetaData[];
  images: ProductImage[];
}

export interface ProductMetaData {
  id: number;
  key: string;
  value: string;
}

export interface ProductImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ProductMetaData {
  id: number;
  key: string;
  value: string;
}

export interface BrandProductDetails {
  quantity: number;
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  type: string;
  attributes: [
    {
      id: number;
      name: string;
      slug: string;
      position: 0;
      visible: boolean;
      variation: boolean;
      options: string[];
    },
  ];
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: string | null;
  date_on_sale_from_gmt: string | null;
  date_on_sale_to: string | null;
  date_on_sale_to_gmt: string | null;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  download_limit: number;
  download_expiry: number;
  external_url: string;
  button_text: string;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: number | null;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  low_stock_amount: number | null;
  sold_individually: boolean;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  upsell_ids: number[];
  cross_sell_ids: number[];
  parent_id: number;
  purchase_note: string;
  categories: ProductCategory[];
  menu_order: number;
  price_html: string;
  related_ids: number[];
  meta_data: ProductMetaData[];
  stock_status: string;
  has_options: boolean;
  post_password: string;
  _links: {
    self: {
      href: string;
    }[];
    collection: {
      href: string;
    }[];
  };
  images: ProductImage[];
}

export interface Brand {
  id: number;
  title: {
    rendered: string;
  };
  acf?: {
    associated_brand: number;
    brand_image: EventImage;
    brand_name: string;
    contact_name: string;
    type_of_business: string;
    short_description?: string;
  };
  'brand-category': string[];
}
