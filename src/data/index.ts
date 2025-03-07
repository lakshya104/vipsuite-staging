import { AgentEditProfileValues } from '@/features/AgentProfile/types';
import { AgentSignupValues } from '@/features/AgentSignupForm/types';
import { BrandEditProfileValues } from '@/features/BrandProfileForm/types';
import { BrandSignupValues } from '@/features/BrandSignupForm/types';
import { QuestionType } from '@/helpers/enums';
import { paths } from '@/helpers/paths';
import { VipSignUpRequestBody } from '@/interfaces/signup';

type VipSignUpFormField = {
  name: keyof VipSignUpRequestBody;
  placeholder: string;
  autocomplete: string;
  type: string;
  label: string;
};

export const VIPSignUpFormFields: VipSignUpFormField[] = [
  { name: 'first_name', label: 'First Name', placeholder: 'First Name', autocomplete: 'given-name', type: 'text' },
  { name: 'last_name', label: 'Last Name', placeholder: 'Last Name', autocomplete: 'family-name', type: 'text' },
  { name: 'email', label: 'Email', placeholder: 'Email', autocomplete: 'email', type: 'text' },
  { name: 'password', label: 'Password', placeholder: 'Password', autocomplete: 'new-password', type: 'password' },
  {
    name: 'secondary_email',
    label: 'Secondary Email',
    placeholder: 'Secondary Email',
    autocomplete: 'email',
    type: 'email',
  },
  { name: 'phone', label: 'Phone', placeholder: 'Phone', autocomplete: 'tel', type: 'tel' },
  { name: 'instagram_handle', label: 'Instagram', placeholder: 'Instagram', autocomplete: 'off', type: 'text' },
  { name: 'tiktok_handle', label: 'TikTok', placeholder: 'TikTok', autocomplete: 'off', type: 'text' },
];

type AgentSignUpFormField = {
  name: keyof AgentSignupValues;
  placeholder?: string;
  autocomplete?: string;
  type?: string;
  label?: string;
  options?: Array<{ value: string; label: string }>;
};

export const AgentSignUpFormFields: AgentSignUpFormField[] = [
  { name: 'first_name', placeholder: 'First Name', label: 'First Name', autocomplete: 'given-name', type: 'text' },
  { name: 'last_name', placeholder: 'Last Name', label: 'Last Name', autocomplete: 'family-name', type: 'text' },
  { name: 'email', placeholder: 'Email', label: 'Email', autocomplete: 'email', type: 'text' },
  { name: 'password', placeholder: 'Password', label: 'Password', autocomplete: 'new-password', type: 'password' },
  { name: 'company_name', placeholder: 'Company Name', label: 'Company Name', autocomplete: 'c-name', type: 'text' },
  { name: 'phone', placeholder: 'Phone Number', label: 'Phone Number', autocomplete: 'tel', type: 'tel' },
  {
    name: 'examples_of_vip_managed',
    placeholder: 'Example of VIP Managed',
    label: 'Example of VIP Managed',
    autocomplete: 'off',
    type: 'text',
  },
];

type BrandSignUpFormField = {
  name: keyof BrandSignupValues;
  placeholder?: string;
  autocomplete?: string;
  type?: string;
  label?: string;
  options?: Array<{ value: string; label: string }>;
};

export const BrandSignUpFormFields: BrandSignUpFormField[] = [
  {
    name: 'brand_name',
    label: 'Brand Name',
    placeholder: 'Brand Name',
    autocomplete: 'brand-name',
    type: 'text',
  },
  {
    name: 'first_name',
    label: 'Contact First Name',
    placeholder: 'Contact First Name',
    autocomplete: 'contact-first-name',
    type: 'text',
  },
  {
    name: 'last_name',
    label: 'Contact Last Name',
    placeholder: 'Contact Last Name',
    autocomplete: 'contact-last-name',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    autocomplete: 'email',
    type: 'text',
  },
  {
    name: 'phone',
    label: 'Phone Number',
    placeholder: 'Phone Number',
    autocomplete: 'tel',
    type: 'tel',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Password',
    autocomplete: 'new-password',
    type: 'password',
  },
  {
    name: 'type_of_business',
    label: 'Type of Business',
    placeholder: 'Type of Business',
    type: 'select',
    options: [
      { value: 'retail', label: 'Retail' },
      { value: 'wholesale', label: 'Wholesale' },
      { value: 'service', label: 'Service' },
      { value: 'manufacturing', label: 'Manufacturing' },
    ],
  },
];

type AgentEditProfileFormField = {
  name: keyof AgentEditProfileValues;
  placeholder?: string;
  autocomplete?: string;
  type?: string;
  label?: string;
  options?: Array<{ value: string; label: string }>;
};

export const AgentEditProfileFields: AgentEditProfileFormField[] = [
  { name: 'first_name', placeholder: 'First Name', autocomplete: 'given-name', type: QuestionType.Text },
  { name: 'last_name', placeholder: 'Last Name', autocomplete: 'family-name', type: QuestionType.Text },
  { name: 'company_name', placeholder: 'Company Name', autocomplete: 'c-name', type: QuestionType.Text },
  { name: 'phone', placeholder: 'Phone Number', autocomplete: 'tel', type: QuestionType.Text },
];

type BrandEditProfileFormField = {
  name: keyof BrandEditProfileValues;
  placeholder?: string;
  autocomplete?: string;
  type?: string;
  label?: string;
  options?: Array<{ value: string; label: string }>;
};

export const BrandEditProfileFields: BrandEditProfileFormField[] = [
  { name: 'first_name', placeholder: 'Contact First Name', autocomplete: 'given-name', type: QuestionType.Text },
  { name: 'last_name', placeholder: 'Contact Last Name', autocomplete: 'family-name', type: QuestionType.Text },
  { name: 'brand_name', placeholder: 'Brand Name', autocomplete: 'b-name', type: QuestionType.Text },
  { name: 'phone', placeholder: 'Phone Number', autocomplete: 'tel', type: QuestionType.Text },
  {
    name: 'type_of_business',
    placeholder: 'Type of Business',
    autocomplete: 'business',
    type: QuestionType.Dropdown,
    label: 'Type of Business',
  },
];

export const contacts = [
  {
    section: 'Events',
    name: 'events',
    description:
      "Should someone else in your team handle event invites and you'd rather opportunities went to them instead, please provide their contact email.",
  },
  {
    section: 'Stylist',
    name: 'stylist',
    description: 'Please provide an alternate contact that would handle your clothing opportunities.',
  },
  {
    section: 'Commercial Opportunities',
    name: 'commercialOpportunities',
    description: 'Please provide an alternate contact that would handle your gifting opportunities.',
  },
];

export const ReferVipFormFields = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    autocomplete: 'email',
    type: 'text',
  },
  {
    name: 'instagram_handle',
    label: 'Instagram Profile',
    placeholder: 'Instagram Profile',
    autocomplete: 'off',
    type: 'text',
  },
  {
    name: 'tiktok_handle',
    label: 'TikTok Profile',
    placeholder: 'TikTok Profile',
    autocomplete: 'off',
    type: 'text',
  },
];

export const vipRejectedBoxContent = {
  title: 'VIP Application Rejected',
  subTitle: 'Unfortunately, Your VIP Application Was Not Approved',
  description:
    'We appreciate your interest. While your application did not meet our criteria this time, we encourage you to apply again in the future. Thank you for your time!',
  buttonText: 'Understood',
  isCrossIcon: false,
};

export const vipNavLinks = [
  {
    label: 'Home',
    href: paths.root.home.getHref(),
    paths: ['/home', '/brands/'],
  },
  {
    label: 'Opportunities',
    href: paths.root.opportunities.getHref(),
    paths: ['/opportunities', '/products'],
  },
  {
    label: 'Events',
    href: paths.root.events.getHref(),
    paths: ['/events'],
  },
  {
    label: 'Inbox',
    href: paths.root.inbox.getHref(),
    paths: ['/inbox', '/my-orders', '/messages'],
  },
  {
    label: 'Profile',
    href: paths.root.profile.getHref(),
    paths: ['/profile'],
  },
];

export const brandNavLinks = [
  {
    label: 'Home',
    href: paths.root.home.getHref(),
    paths: ['/home', '/brands/'],
  },
  {
    label: 'Opportunities',
    href: paths.root.opportunities.getHref(),
    paths: ['/opportunities', '/products'],
  },
  {
    label: 'Events',
    href: paths.root.events.getHref(),
    paths: ['/events'],
  },
  {
    label: 'Inbox',
    href: paths.root.inbox.getHref(),
    paths: ['/inbox', '/my-orders', '/messages'],
  },
  {
    label: 'Profile',
    href: paths.root.profile.getHref(),
    paths: ['/profile', '/edit-profile', '/edit-brand-profile'],
  },
];

export const vipFooterItems = [
  {
    href: paths.root.home.getHref(),
    src: '/img/home.svg',
    alt: 'Home',
    label: 'Home',
    paths: ['/home'],
    srcselected: '/img/home-selected.svg',
  },
  {
    href: paths.root.opportunities.getHref(),
    src: '/img/opportunity.svg',
    alt: 'Opportunities',
    label: 'Opportunities',
    paths: ['/opportunities', '/products'],
    srcselected: '/img/opportunities-selected.svg',
  },
  {
    href: paths.root.events.getHref(),
    src: '/img/event.svg',
    alt: 'Events',
    label: 'Events',
    paths: ['/events'],
    srcselected: '/img/events-selected.svg',
  },
  {
    href: paths.root.inbox.getHref(),
    src: '/img/inbox.svg',
    alt: 'Inbox',
    label: 'Inbox',
    paths: ['/inbox', '/my-orders', '/messages'],
    srcselected: '/img/inbox-selected.svg',
  },
  {
    href: paths.root.profile.getHref(),
    src: '/img/user.svg',
    alt: 'Profile',
    label: 'Profile',
    paths: ['/profile', '/edit-profile', '/edit-brand-profile'],
    srcselected: '/img/user-selected.svg',
  },
];

export const brandFooterItems = [
  {
    href: paths.root.home.getHref(),
    src: '/img/home.svg',
    alt: 'Home',
    label: 'Home',
    paths: ['/home', '/brands/', '/product'],
    srcselected: '/img/home-selected.svg',
  },
  {
    href: paths.root.opportunities.getHref(),
    src: '/img/opportunity.svg',
    alt: 'Opportunities',
    label: 'Opportunities',
    paths: ['/opportunities'],
    srcselected: '/img/opportunities-selected.svg',
  },
  {
    href: paths.root.events.getHref(),
    src: '/img/event.svg',
    alt: 'Events',
    label: 'Events',
    paths: ['/events'],
    srcselected: '/img/events-selected.svg',
  },
  {
    href: paths.root.inbox.getHref(),
    src: '/img/inbox.svg',
    alt: 'Inbox',
    label: 'Inbox',
    paths: ['/inbox', '/my-orders'],
    srcselected: '/img/inbox-selected.svg',
  },
  {
    href: paths.root.profile.getHref(),
    src: '/img/user.svg',
    alt: 'Profile',
    label: 'Profile',
    paths: ['/profile'],
    srcselected: '/img/user-selected.svg',
  },
];

export const BookDemoFormFields = [
  { name: 'role', placeholder: 'Brand, VIP or Agent?', label: 'Role', autocomplete: 'off', type: 'select' },
  { name: 'name', placeholder: 'Name', label: 'Name', autocomplete: 'off', type: 'text' },
  { name: 'email', placeholder: 'Email', label: 'Email', autocomplete: 'off', type: 'text' },
  { name: 'jobTitle', placeholder: 'Job Title', label: 'Job Title', autocomplete: 'off', type: 'text' },
  { name: 'company', placeholder: 'Company Name', label: 'Company Name', autocomplete: 'off', type: 'text' },
];

export const ContactUsFormFields = [
  { name: 'role', placeholder: 'Brand, VIP or Agent?', label: 'Role', autocomplete: 'off', type: 'select' },
  { name: 'name', placeholder: 'Name', label: 'Name', autocomplete: 'off', type: 'text' },
  { name: 'email', placeholder: 'Email', label: 'Email', autocomplete: 'off', type: 'text' },
  { name: 'jobTitle', placeholder: 'Job Title', label: 'Job Title', autocomplete: 'off', type: 'text' },
  { name: 'company', placeholder: 'Company Name', label: 'Company Name', autocomplete: 'off', type: 'text' },
  { name: 'phone', label: 'Phone', placeholder: 'Phone', autocomplete: 'tel', type: 'tel' },
];
