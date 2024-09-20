import { Brand } from './brand';
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

export type DashboardItem = Brand | Event | Opportunity;
