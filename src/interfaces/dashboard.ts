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
  images: productImage[];
  short_description: string;
  acf?: {
    is_request_only?: boolean;
    brand_logo?: BrandLogo;
  };
  is_wishlisted?: boolean;
}

interface productImage {
  id: string;
  src: string;
  name: string;
}

export type DashboardItem = Dashboardproduct | Event | Opportunity;
