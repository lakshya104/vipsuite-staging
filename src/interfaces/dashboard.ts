import { BrandLogo } from './brand';
import { Event } from './events';
import { Opportunity } from './opportunities';

export interface DashboardContent {
  refer_vip_heading: string;
  refer_vip_short_description: string;
  refer_vip_description: string;
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
  dynamic_dashboard_questions: DynamicFormRequests[];
  dashboard_cards: DashboardItem[];
  static_dashboard_questions: DashboardContent;
}

export interface DynamicFormRequests {
  title: string;
  description: string;
}

export interface ContentCard {
  title: string;
  description: string;
  linked_opportunity: {
    ID: number;
    post_type: 'opportunity' | 'event' | 'product';
  };
  image: {
    url: string;
    alt: string;
  };
}
