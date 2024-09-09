import { BrandLogo } from './brand';

export interface EventImageSizes {
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

interface EventACF {
  event_start_date: string;
  event_end_date: string;
  event_location: string;
  is_featured: boolean;
  event_image: EventImage;
  brand_logo?: BrandLogo;
}

interface EventGuid {
  rendered: string;
}

interface EventTitle {
  rendered: string;
}

interface EventLinks {
  self: { href: string }[];
  collection: { href: string }[];
  about: { href: string }[];
  'wp:attachment': { href: string }[];
  'wp:term': { taxonomy: string; embeddable: boolean; href: string }[];
  curies: { name: string; href: string; templated: boolean }[];
}

export interface Event {
  id: number;
  date: string;
  date_gmt: string;
  guid: EventGuid;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: EventTitle;
  template: string;
  'event-category': string[];
  class_list: string[];
  acf: EventACF;
  _links: EventLinks;
}

export interface EventDetails {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  template: string;
  event_category: number[];
  class_list: string[];
  acf: {
    event_status: string;
    is_featured: boolean;
    associated_brand: number;
    event_image: EventImage;
    event_start_date: string;
    event_end_date: string;
    event_location: string;
    event_quick_overview: string;
    event_details: string;
    payment_details: boolean;
    payment_status: string;
    is_rsvp?: boolean;
    is_feedback_provided: boolean;
    brand_logo: BrandLogo;
  };
  _links: Links;
}

export interface EventImage {
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

interface Links {
  self: {
    href: string;
  }[];
  collection: {
    href: string;
  }[];
  about: {
    href: string;
  }[];
  wp_attachment: {
    href: string;
  }[];
  wp_term: {
    taxonomy: string;
    embeddable: boolean;
    href: string;
  }[];
  curies: {
    name: string;
    href: string;
    templated: boolean;
  }[];
}
