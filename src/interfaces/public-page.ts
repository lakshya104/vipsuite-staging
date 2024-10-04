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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cta: any;
  acf_fc_layout: string;
  heading: string;
  html_tag?: string;
  cta_group?: CTA[];
  slides?: Slide[];
  list_items?: ListItem[];
  settings: {
    hide_component: boolean;
  };
  description?: string;
  table_columns?: [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content_blocks?: any;
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
