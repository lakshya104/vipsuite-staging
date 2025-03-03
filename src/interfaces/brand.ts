import { EventImage, EventImageSizes, Question } from './events';
import { ImageSizes } from './opportunitiesDetails';

export interface BrandDetails {
  id: number;
  title: {
    rendered: string;
  };
  acf: {
    associated_brand: number;
    brand_name: string;
    contact_name: string;
    type_of_business: string;
    short_description: string;
    brand_image: EventImage;
    brand_logo?: BrandLogo;
    is_lookbook_available: boolean;
    lookbook_heading: string;
    lookbook_description: string;
    lookbook_pdf: string;
  };
  associated_posts: {
    type: string;
    posts: Post[];
  };
}

export interface BrandProduct {
  id: number;
  name: string;
  type: string;
  status: string;
  featured: boolean;
  description: string;
  short_description: string;
  brand_id: number;
  isBrandCard: boolean;
  meta_data: ProductMetaData[];
  images: ProductImage[];
}

export interface Post {
  ID: number;
  title: {
    rendered: string;
  };
  opportunity_category: string[];
  acf: {
    event_start_date?: string;
    event_end_date?: string;
    event_location?: string;
    is_featured: true;
    associated_brand_profile: number;
    is_request_only: false;
    is_high_end_item: true;
    short_description?: string;
    featured_image: {
      sizes: {
        thumbnail: string;
        medium: string;
        medium_large: string;
        large: string;
        'large-2x': string;
        'vs-container': string;
        'vs-container-2x': string;
        'vs-container-half': string;
        'vs-container-mobile-2x': string;
      };
    };
  };
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

interface Dimensions {
  length: string;
  width: string;
  height: string;
}
interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface AttributeOption {
  id: number;
  name: string;
  slug: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface FilterDropdown {
  name: string;
  slug: string;
  option: string;
  label: string;
}

export interface ProductVariation {
  quantity?: number;
  id: number;
  attributes: FilterDropdown[];
}

interface MetaData {
  id: number;
  key: string;
  value: string;
}

// Main Product Interface
export interface Product {
  id: number;
  name: string;
  acf: {
    is_lookbook_available: boolean;
    lookbook_heading: string;
    lookbook_description: string;
    lookbook_pdf: string;
    show_offers: boolean;
    is_request_only: boolean;
  };
  images: {
    sizes: ImageSizes;
  }[];
  gallery_images: {
    sizes: ImageSizes;
  }[];
  cta_label: string;
  opportunity_id: string;
  is_high_end_item: boolean;
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
  downloads: string[];
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
  dimensions: Dimensions;
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
  categories: Category[];
  tags: string[];
  product_attributes: AttributeOption[];
  default_attributes: string[];
  variations: number[];
  grouped_products: string[];
  menu_order: number;
  price_html: string;
  related_ids: number[];
  meta_data: MetaData[];
  stock_status: string;
  has_options: boolean;
  post_password: string;
  product_variations: ProductVariation[];
  product_ordered: boolean;
  brand_name: string;
  _links: {
    self: { href: string }[];
    collection: { href: string }[];
  };
  questions: Question[];
}

export interface Brand {
  id: number;
  type: 'brand-profile';
  title: {
    rendered: string;
  };
  is_featured?: boolean;
  acf?: {
    is_featured?: boolean;
    associated_brand: number;
    brand_image: EventImage;
    brand_name: string;
    contact_name: string;
    type_of_business: string;
    short_description: string;
    brand_logo?: BrandLogo;
  };
  is_wishlisted?: boolean;
}

export interface BrandLogo {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: EventImageSizes;
}
