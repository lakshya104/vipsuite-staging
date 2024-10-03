// Define the interface for the featured image
interface FeaturedImage {
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
  sizes: {
    thumbnail: string;
    thumbnail_width: number;
    thumbnail_height: number;
    medium: string;
    medium_width: number;
    medium_height: number;
    medium_large: string;
    medium_large_width: number;
    medium_large_height: number;
    large: string;
    large_width: number;
    large_height: number;
    [key: string]: string | number;
  };
}

type GalleryItem = FeaturedImage

interface Acf {
  associated_brand_profile: number;
  featured_image: FeaturedImage;
  gallery: GalleryItem[];
  the_offer: string;
  the_ask: string;
  date: string;
  location: string;
  is_featured: boolean;
}

export interface Opportunity {
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
  'opportunity-category': string[];
  class_list: string[];
  acf: Acf;
  is_wishlisted?: boolean;
}
