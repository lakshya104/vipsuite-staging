import { QuestionType } from '@/helpers/enums';
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
  brand_id: number;
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
  type: 'event';
  link: string;
  title: EventTitle;
  template: string;
  class_list: string[];
  acf: EventACF;
  _links: EventLinks;
  is_wishlisted?: boolean;
  is_featured?: boolean;
  isBrandCard: boolean;
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
  class_list: string[];
  acf: {
    questions: Question[];
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
    brand_name?: string;
    is_lookbook_available: boolean;
    lookbook_heading: string;
    lookbook_description: string;
    lookbook_pdf: string;
    show_offers: boolean;
    show_rsvp_button?: boolean;
  };
  is_wishlisted?: boolean;
}

export interface Choice {
  text: string;
}

export interface Question {
  title: string;
  input_type: QuestionType;
  is_required: boolean;
  choices: Choice[] | null;
  answer?: string;
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
