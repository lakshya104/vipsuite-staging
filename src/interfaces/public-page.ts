export interface PageData {
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
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: {
    _acf_changed: boolean;
    footnotes: string;
  };
  class_list: string[];
  acf: {
    use_default_hero_panel: boolean;
    image: Image;
    heading: string;
    subheading: string;
    copy: string;
    cta: CTA;
    content_modules: ContentModule[];
    subhading: string;
  };
  _links: Links;
  sizes: HomeImageSizes;
}

export interface CTA {
  cta_type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  link: any;
  cta_page: string | null;
  cta_url: string;
  cta_external_link: boolean;
  cta_text: string;
  cta_hide_title_attr: boolean;
  cta_title_attr: string;
  cta_accessibility_text: string;
  cta: PublicCta;
}

export interface PublicCta {
  title: string;
  url: string;
  target: '_self' | '_blank' | '_parent' | '_top';
}

export interface ContentModule {
  description: string;
  image: {
    url: string;
    name: string;
    alt: string;
  };
  heading?: string;
  cta?: {
    cta_type: string;
    cta_url: string;
    cta_external_link: boolean;
    cta_text: string;
  };
  content?: string;
  copy?: string;
  acf_fc_layout: string;
  form_type: 'book-demo' | 'contact-us';
  html_tag?: string;
  cta_group?: CTA[];
  slides?: Slide[];
  list_items?: ListItem[];
  full_width_layout?: boolean;
  apply_wrapper?: boolean;
  settings: {
    hide_component: boolean;
  };
  table_columns?: [];
  content_blocks: ContentBlocks[];
  faqs: FAQ[];
}
export interface FAQ {
  question: string;
  answer: string;
}

export interface ContentBlocks {
  heading: string;
  show_cta?: boolean;
  image: {
    url: string;
    name: string;
    alt: string;
  };
  description?: string;
  cta: {
    cta_url: string;
    cta_text: string;
  };
  image_position?: 'left' | 'right';
}

export interface Slide {
  image: Image;
  heading: string;
  copy: string;
  show_cta: boolean;
  cta: {
    link: Link;
    title: string;
    accessibility_text: string;
  };
}

export interface ListItem {
  heading: string;
  copy: string;
  logo: Logo;
  brand_logo: BrandLogo;
  author: Author;
  testimonial_text: string;
}

export interface Link {
  title: string;
  url: string;
  target: string;
}

export interface Links {
  self: {
    href: string;
  }[];
  collection: {
    href: string;
  }[];
  about: {
    href: string;
  }[];
  author: {
    embeddable: boolean;
    href: string;
  }[];
  replies: {
    embeddable: boolean;
    href: string;
  }[];
  'version-history': {
    count: number;
    href: string;
  }[];
  'predecessor-version': {
    id: number;
    href: string;
  }[];
  'wp:attachment': {
    href: string;
  }[];
  curies: {
    name: string;
    href: string;
    templated: boolean;
  }[];
}

export interface Image {
  sizes: HomeImageSizes;
}

export interface HomeImageSizes {
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

export interface Logo {
  sizes: HomeImageSizes;
  title: string;
}

export interface Testimonial {
  brand_logo: BrandLogo;
  testimonial_text: string;
  author: Author;
}
interface Author {
  photo: AuthorPhoto;
  name: string;
  job_title: string;
}
type AuthorPhoto = BrandLogo;

export interface BrandLogo {
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
}

export interface MenuItemData {
  ID: number;
  title: string;
  url: string;
  menu_item_parent: string;
  object: string;
}

export interface WebsiteContent {
  header_menu: MenuItemData[];
  notification_form_id: number;
  contact_form_id: number;
  book_demo_form_id: number;
  website_tagline: string;
  play_store_url: string;
  apple_store_url: string;
  instagram_url: string;
  facebook_url: string;
  x_url: string;
  pinterest_url: string;
  footer_menu_1: HeaderMenu[];
  footer_menu_2: HeaderMenu[];
  footer_bottom: HeaderMenu[];
}

export interface HeaderMenu {
  title: string;
  url: string;
}
