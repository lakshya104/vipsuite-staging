import { BrandLogo } from './brand';
import { Event } from './events';
import { Opportunity } from './opportunities';

export interface DashboardContent {
  rafer_vip_heading: string;
  rafer_vip_short_description: string;
  rafer_vip_description: string;
  make_request_heading: string;
  make_request_short_description: string;
  make_request_description: string;
}

export interface Dashboardproduct {
  id: number;
  type: 'product';
  title: {
    rendered: string;
  };
  is_featured?: boolean;
  image: productImage;
  short_description: string;
  acf?: {
    is_request_only?: boolean;
    brand_logo?: BrandLogo;
    is_featured: boolean | null;
  };
  is_wishlisted?: boolean;
}

interface productImage {
  id: string;
  src: string;
  name: string;
}

export type DashboardItem = Dashboardproduct | Event | Opportunity;

export interface DashboardData {
  dashboard_content: DashboardItem[];
  show_make_request_form: boolean;
  dynamic_form_requests: DynamicFormRequests[];
  dashboard_content_cards: ContentCard[];
  static_form_requests: DashboardContent;
}

export interface DynamicFormRequests {
  title: string;
  description: string;
}

export interface ContentCard {
  title: string;
  description: string;
  url: string;
  image: {
    url: string;
    alt: string;
  };
}
