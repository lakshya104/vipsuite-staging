import { AgentEditProfileValues } from '@/features/AgentProfile/types';
import { AgentSignupValues } from '@/features/AgentSignupForm/types';
import { BrandSignupValues } from '@/features/BrandSignupForm/types';
import { VipSignUpRequestBody } from '@/interfaces/signup';

export const nationalityOptions = [
  { value: 'american', label: 'American' },
  { value: 'canadian', label: 'Canadian' },
  { value: 'british', label: 'British' },
];

export const ethnicityOptions = [
  { value: 'asian', label: 'Asian' },
  { value: 'african', label: 'African' },
  { value: 'hispanic', label: 'Hispanic' },
];

export const numberOfChildrenOptions = [
  { value: '1', label: '1 Child' },
  { value: '2', label: '2 Children' },
  { value: '3', label: '3 Children' },
];

export const ageOfChildOptions = [
  { value: 'infant', label: 'Infant' },
  { value: 'toddler', label: 'Toddler' },
  { value: 'child', label: 'Child' },
];

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
  { name: 'email', label: 'Email', placeholder: 'Email', autocomplete: 'email', type: 'email' },
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
  placeholder?: string | undefined;
  autocomplete?: string | undefined;
  type?: string | undefined;
  label?: string | undefined;
  options?: Array<{ value: string; label: string }>;
};

export const AgentSignUpFormFields: AgentSignUpFormField[] = [
  { name: 'first_name', placeholder: 'First Name', autocomplete: 'given-name', type: 'text' },
  { name: 'last_name', placeholder: 'Last Name', autocomplete: 'family-name', type: 'text' },
  { name: 'email', placeholder: 'Email', autocomplete: 'email', type: 'email' },
  { name: 'password', placeholder: 'Password', autocomplete: 'new-password', type: 'password' },
  { name: 'company_name', placeholder: 'Company Name', autocomplete: 'c-name', type: 'text' },
  { name: 'phone', placeholder: 'Phone Number', autocomplete: 'tel', type: 'tel' },
  { name: 'examples_of_vip_managed', placeholder: 'Example of VIP Managed', autocomplete: 'off', type: 'text' },
];

type BrandSignUpFormField = {
  name: keyof BrandSignupValues;
  placeholder?: string | undefined;
  autocomplete?: string | undefined;
  type?: string | undefined;
  label?: string | undefined;
  options?: Array<{ value: string; label: string }>;
};

export const BrandSignUpFormFields: BrandSignUpFormField[] = [
  { name: 'brand_name', placeholder: 'Brand Name', autocomplete: 'brand-name', type: 'text' },
  { name: 'contact_name', placeholder: 'Contact Name', autocomplete: 'contact-name', type: 'text' },
  { name: 'email', placeholder: 'Email', autocomplete: 'email', type: 'email' },
  { name: 'phone', placeholder: 'Phone Number', autocomplete: 'tel', type: 'tel' },
  { name: 'password', placeholder: 'Password', autocomplete: 'new-password', type: 'password' },
  {
    name: 'type_of_business',
    placeholder: 'Type of Business',
    label: 'Type of Business',
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
  placeholder?: string | undefined;
  autocomplete?: string | undefined;
  type?: string | undefined;
  label?: string | undefined;
  options?: Array<{ value: string; label: string }>;
};

export const AgentEditProfileFields: AgentEditProfileFormField[] = [
  { name: 'first_name', placeholder: 'First Name', autocomplete: 'given-name', type: 'text' },
  { name: 'last_name', placeholder: 'Last Name', autocomplete: 'family-name', type: 'text' },
  { name: 'company_name', placeholder: 'Company Name', autocomplete: 'c-name', type: 'text' },
  { name: 'phone', placeholder: 'Phone Number', autocomplete: 'tel', type: 'tel' },
  { name: 'examples_of_vip_managed', placeholder: 'Example of VIP Managed', autocomplete: 'off', type: 'text' },
];

export const contacts = [
  {
    section: 'Events',
    description:
      "Should someone else in your team handle event invites and you'd rather opportunities went to them instead, please provide their contact email.",
  },
  {
    section: 'Stylist',
    description: 'Please provide an alternate contact that would handle your clothing opportunities.',
  },
  {
    section: 'Gifting',
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

export const vipPendingBoxContent = {
  title: 'VIP Application Pending',
  subTitle: 'We are Reviewing Your VIP Application',
  description:
    'Thanks for submitting your VIP application, Our concierge team is carefully reviewing your submission and will get back to you shortly with an update.',
  buttonText: 'Got It',
  isCrossIcon: false,
};

export const vipRejectedBoxContent = {
  title: 'VIP Application Rejected',
  subTitle: 'Unfortunately, Your VIP Application Was Not Approved',
  description:
    'We appreciate your interest. While your application did not meet our criteria this time, we encourage you to apply again in the future. Thank you for your time!',
  buttonText: 'Understood',
  isCrossIcon: false,
};
