export interface ImageSizes {
  thumbnail: string;
  'thumbnail-width': number;
  'thumbnail-height': number;
  medium: string;
  'medium-width': number;
  'medium-height': number;
  medium_large: string;
  'medium_large-width': number;
  'medium_large-height': number;
  large: string;
  'large-width': number;
  'large-height': number;
  '1536x1536': string;
  '1536x1536-width': number;
  '1536x1536-height': number;
  '2048x2048': string;
  '2048x2048-width': number;
  '2048x2048-height': number;
  woocommerce_thumbnail: string;
  'woocommerce_thumbnail-width': number;
  'woocommerce_thumbnail-height': number;
  woocommerce_single: string;
  'woocommerce_single-width': number;
  'woocommerce_single-height': number;
  woocommerce_gallery_thumbnail: string;
  'woocommerce_gallery_thumbnail-width': number;
  'woocommerce_gallery_thumbnail-height': number;
}

export interface OpportunityDetails {
  id: number;
  date: string;
  date_gmt: string;
  guid: RenderedString;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: RenderedString;
  template: string;
  opportunity_category: number[];
  class_list: string[];
  acf: Acf;
  _links: Links;
}

export interface RenderedString {
  rendered: string;
}

export interface Acf {
  associated_brand_profile: number;
  featured_image: FeaturedImage;
  gallery: FeaturedImage[];
  the_offer: string;
  the_ask: string;
  date: string;
  location: string;
  is_rsvp: boolean;
}

export interface FeaturedImage {
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
  sizes: ImageSizes;
}

export interface Links {
  self: Link[];
  collection: Link[];
  about: Link[];
  'wp:attachment': Link[];
  'wp:term': LinkWithTaxonomy[];
  curies: Curies[];
}

export interface Link {
  href: string;
}

export interface LinkWithTaxonomy extends Link {
  taxonomy: string;
  embeddable: boolean;
}

export interface Curies {
  name: string;
  href: string;
  templated: boolean;
}
