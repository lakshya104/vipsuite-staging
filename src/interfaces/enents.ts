interface EventImageSizes {
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  medium: string;
  mediumWidth: number;
  mediumHeight: number;
  mediumLarge: string;
  mediumLargeWidth: number;
  mediumLargeHeight: number;
  large: string;
  largeWidth: number;
  largeHeight: number;
  '1536x1536': string;
  '1536x1536Width': number;
  '1536x1536Height': number;
  '2048x2048': string;
  '2048x2048Width': number;
  '2048x2048Height': number;
  woocommerceThumbnail: string;
  woocommerceThumbnailWidth: number;
  woocommerceThumbnailHeight: number;
  woocommerceSingle: string;
  woocommerceSingleWidth: number;
  woocommerceSingleHeight: number;
  woocommerceGalleryThumbnail: string;
  woocommerceGalleryThumbnailWidth: number;
  woocommerceGalleryThumbnailHeight: number;
}

interface EventImage {
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

interface EventACF {
  event_start_date: string;
  event_end_date: string;
  event_location: string;
  is_featured: boolean;
  event_image: EventImage;
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
