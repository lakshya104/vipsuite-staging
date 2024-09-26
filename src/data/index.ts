import { AgentSignupValues } from '@/features/AgentSignupForm/types';
import { ProductDetail } from '@/interfaces/product';
import { VipSignUpRequestBody } from '@/interfaces/signup';

export const testimonials = [
  {
    name: 'Alex Jones',
    title: 'Managing Director, McDonalds',
    testimonial:
      'Lorem ipsum dolor sit amet, te eos albucius constituto, ex blandit probatus definiebas est. At dicam civibus nec, legere corrumpit voluptatum pri ei, est id prima habemus. Ei has wisi ignota.',
    logo: '/img/McDonalds-logo.svg', // replace with actual path,
  },
  {
    name: 'Hayley Smith',
    title: 'Head of PR, Kraft Heinz',
    testimonial:
      'Lorem ipsum dolor sit amet, te eos albucius constituto, ex blandit probatus definiebas est. At dicam civibus nec, legere corrumpit voluptatum pri ei, est id prima habemus. Ei has wisi ignota.',
    logo: '/img/McDonalds-logo.svg', // replace with actual path
  },
  {
    name: 'Abdi Teller',
    title: 'Marketing Manager, Disney UK',
    testimonial:
      'Lorem ipsum dolor sit amet, te eos albucius constituto, ex blandit probatus definiebas est. At dicam civibus nec, legere corrumpit voluptatum pri ei, est id prima habemus. Ei has wisi ignota.',
    logo: '/img/McDonalds-logo.svg', // replace with actual path
  },
];

export const navLinks = [
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'Brands',
    href: '/for-brands',
  },
  {
    label: 'VIPs',
    href: '/for-vips',
  },
  {
    label: 'FAQs',
    href: '/faqs',
  },
  {
    label: 'About Us',
    href: '/about-us',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

export const heroSectionLine = 'Invite-only, private members portal for events, campaigns, gifting and more.';

export const partners = [
  {
    title: 'Partner 1',
    img: '/img/under-armor.svg',
  },
  {
    title: 'Partner 2',
    img: '/img/nike.svg',
  },
  {
    title: 'Partner 3',
    img: '/img/netflix.svg',
  },
  {
    title: 'Partner 4',
    img: '/img/coca-cola.svg',
  },
  {
    title: 'Partner 5',
    img: '/img/mercedes.svg',
  },
  {
    title: 'Partner 6',
    img: '/img/Guinness.svg',
  },
  {
    title: 'Partner 7',
    img: '/img/under-armor.svg',
  },
  {
    title: 'Partner 8',
    img: '/img/nike.svg',
  },
  {
    title: 'Partner 9',
    img: '/img/netflix.svg',
  },
  {
    title: 'Partner 10',
    img: '/img/coca-cola.svg',
  },
  {
    title: 'Partner 11',
    img: '/img/mercedes.svg',
  },
  {
    title: 'Partner 12',
    img: '/img/Guinness.svg',
  },
];

export const eventCardData = [
  {
    id: 1,
    title: 'Event',
    description:
      'We understand what is needed for each event by way of press cut through, authenticity and ambience and have a team who can deliver above and beyond on client expectations.',
  },
  {
    id: 2,
    title: 'Gifting',
    description:
      'Access profiled celebrities and influencers direct to their personal email address and send product out, through our storage facility, direct to their door.',
  },
  {
    id: 3,
    title: 'Campaigns',
    description:
      'We understand what is needed for each event by way of press cut through, authenticity and ambience and have a team who can deliver above and beyond on client expectations.',
  },
  {
    id: 4,
    title: 'Profiling',
    description:
      'Access profiled celebrities and influencers direct to their personal email address and send product out, through our storage facility, direct to their door. ',
  },
];

export const opportunities = [
  {
    title: 'BRIT Awards requires products for gift bags',
    time: 'Just now',
  },
  {
    title: 'BRIT Awards requires products for gift bags',
    time: 'Just now',
  },
  {
    title: 'BRIT Awards requires products for gift bags',
    time: 'Just now',
  },
  {
    title: 'BRIT Awards requires products for gift bags',
    time: 'Just now',
  },
  {
    title: 'BRIT Awards requires products for gift bags',
    time: 'Just now',
  },
  {
    title: 'BRIT Awards requires products for gift bags',
    time: 'Just now',
  },
  {
    title: 'BRIT Awards requires products for gift bags',
    time: 'Just now',
  },
  {
    title: 'BRIT Awards requires products for gift bags',
    time: 'Just now',
  },
];

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

export const interests = [
  { value: 'actor', label: 'Actor' },
  { value: 'musician', label: 'Musician' },
  { value: 'tv-presenter', label: 'TV Presenter' },
  { value: 'radio-presenter', label: 'Radio Presenter' },
  { value: 'influencer', label: 'Influencer' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'model', label: 'Model' },
  { value: 'sportsperson', label: 'Sportsperson' },
  { value: 'content-creator', label: 'Content Creator' },
  { value: 'youtube', label: 'YouTube' },
];

export const vipStep3formFields = [
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'date',
    placeholder: 'Date of Birth',
  },
  {
    name: 'birthplace',
    label: 'Birthplace',
    type: 'text',
    placeholder: 'Birthplace',
  },
  {
    name: 'nationality',
    label: 'Nationality',
    type: 'select',
    options: nationalityOptions,
  },
  {
    name: 'ethnicity',
    label: 'Ethnicity',
    type: 'select',
    options: ethnicityOptions,
  },
  {
    name: 'numberOfChildren',
    label: 'Number of Children',
    type: 'select',
    options: numberOfChildrenOptions,
  },
  {
    name: 'ageOfChild',
    label: 'Age of Child',
    type: 'select',
    options: ageOfChildOptions,
  },
  {
    name: 'pets',
    label: 'Pets',
    type: 'text',
    placeholder: 'Pets',
  },
  {
    name: 'homePostcode',
    label: 'Home Postcode',
    type: 'text',
    placeholder: 'Home Postcode',
  },
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
  type: string | undefined;
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

export const sportsPlayOptions = [
  { value: 'football', label: 'Football' },
  { value: 'basketball', label: 'Basketball' },
  { value: 'cricket', label: 'Cricket' },
];

export const sportsFollowOptions = [
  { value: 'football', label: 'Football' },
  { value: 'basketball', label: 'Basketball' },
  { value: 'cricket', label: 'Cricket' },
];

export const skillsOptions = [
  { value: 'cooking', label: 'Cooking' },
  { value: 'travelling', label: 'Travelling' },
  { value: 'reading', label: 'Reading' },
];

export const socialLookOptions = [
  { value: 'clean', label: 'Clean' },
  { value: 'theme', label: 'Theme' },
  { value: 'abstract', label: 'Abstract' },
];

export const interestOptions = [
  { value: 'alcohol', label: 'Alcohol' },
  { value: 'food', label: 'Food' },
  { value: 'cars', label: 'Cars' },
  { value: 'motorbikes', label: 'Motorbikes' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'sustainability', label: 'Sustainability' },
  { value: 'disney', label: 'Disney' },
  { value: 'marvel', label: 'Marvel' },
  { value: 'film_tv', label: 'Film & TV' },
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

export const interestsStep5 = [
  { value: 'activism', label: 'Activism' },
  { value: 'advice', label: 'Advice' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'architecture', label: 'Architecture' },
  { value: 'art', label: 'Art' },
  { value: 'authors', label: 'Authors' },
  { value: 'baking', label: 'Baking' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'beer', label: 'Beer' },
  { value: 'blogging', label: 'Blogging' },
  { value: 'books', label: 'Books' },
  { value: 'business', label: 'Business' },
  { value: 'camping', label: 'Camping' },
  { value: 'cocktails', label: 'Cocktails' },
  { value: 'cars', label: 'Cars' },
  { value: 'coding', label: 'Coding' },
  { value: 'comics', label: 'Comics' },
  { value: 'cooking', label: 'Cooking' },
  { value: 'culture', label: 'Culture' },
  { value: 'dance', label: 'Dance' },
];

export type FeedItem = {
  heading: string;
  description?: string;
  imagePath: string;
  type: string[];
  byRequest: boolean;
  time: string[];
};

export const feedItems: FeedItem[] = [
  {
    heading: 'The Maldives',
    description:
      'The VIP Suite is excited to have access to various different resorts in the Maldives offering either comped or discounted stays.',
    imagePath: '/img/maldives.png',
    type: ['Lifestyle', 'Hotel', 'Travel'],
    byRequest: true,
    time: ['all', 'expiringSoon'],
  },
  {
    heading: 'NordicTrack',
    imagePath: '/img/cycle.png',
    type: ['Lifestyle', 'Fitness', 'Home'],
    byRequest: false,
    time: ['all', 'expiringSoon'],
  },
  {
    heading: 'Domino’s Pizza',
    imagePath: '/img/dominos.png',
    type: ['Restaaurant', 'Food & Beverage', 'Gifting'],
    byRequest: false,
    time: ['all', 'newest'],
  },
  {
    heading: 'Boda Skins',
    imagePath: '/img/bodaSkins.png',
    type: ['Lifestyle', 'Fashion', 'Luxury'],
    byRequest: false,
    time: ['all', 'expiringSoon'],
  },
  {
    heading: 'The Maldives',
    description:
      'The VIP Suite is excited to have access to various different resorts in the Maldives offering either comped or discounted stays.',
    imagePath: '/img/maldives.png',
    type: ['Lifestyle', 'Hotel', 'Travel'],
    byRequest: true,
    time: ['all', 'newest'],
  },
  {
    heading: 'NordicTrack',
    imagePath: 'img/cycle.png',
    type: ['Lifestyle', 'Fitness', 'Home'],
    byRequest: false,
    time: ['all', 'expiringSoon'],
  },
  {
    heading: 'Domino’s Pizza',
    imagePath: '/img/dominos.png',
    type: ['Restaaurant', 'Food & Beverage', 'Gifting'],
    byRequest: false,
    time: ['all', 'newest'],
  },
  {
    heading: 'Boda Skins',
    imagePath: '/img/bodaSkins.png',
    type: ['Lifestyle', 'Fashion', 'Luxury'],
    byRequest: false,
    time: ['all', 'expiringSoon'],
  },
];

export const products: ProductDetail[] = [
  {
    id: 1,
    name: 'Product 1',
    imageUrl: '/img/product_1.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    requestOnly: true,
    category: 'Boda Skins',
    size: '',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Product 2',
    imageUrl: '/img/product_2.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    requestOnly: false,
    category: 'Boda Skins',
    size: '',
    quantity: 1,
  },
  {
    id: 3,
    name: 'Product 3',
    imageUrl: '/img/product_1.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    requestOnly: true,
    category: 'Boda Skins',
    size: '',
    quantity: 1,
  },
  {
    id: 4,
    name: 'Product 4',
    imageUrl: '/img/product_2.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    requestOnly: false,
    category: 'Boda Skins',
    size: '',
    quantity: 1,
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
