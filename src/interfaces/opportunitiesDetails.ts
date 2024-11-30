import { Question } from './events';

export interface ImageSizes {
  thumbnail: string;
  medium: string;
  medium_large: string;
  large: string;
  'large-2x': string;
  'vs-container': string;
  'vs-container-2x': string;
  'vs-container-half': string;
  'vs-container-mobile-2x': string;
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
  class_list: string[];
  acf: Acf;
  is_wishlisted?: boolean;
  _links: Links;
  gallery: [];
}

export interface RenderedString {
  rendered: string;
}

export interface Acf {
  associated_brand_profile: number;
  featured_image: FeaturedImage;
  gallery: FeaturedImage[];
  short_description: string;
  description: string;
  // date: string;
  // location: string;
  is_rsvp: boolean;
  questions: Question[];
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
