import { EventImage } from './events';

export interface WishlistItem {
  id: number;
  post_type: 'event' | 'brand-profile';
  post_title: string;
  image: EventImage;
  event_start_date?: string;
  event_end_date?: string;
  event_location?: string;
}
