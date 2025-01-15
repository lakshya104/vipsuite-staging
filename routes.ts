export const publicRoutes = ['/', '/comingsoon'];

export const authRoutes = [
  '/login',
  '/forgot-password',
  '/on-boarding',
  '/signup/vip',
  '/signup/agent',
  '/signup/brand',
];

export const protectedRoutes = [
  /^\/home$/,
  /^\/opportunities$/,
  /^\/events$/,
  /^\/brand-home$/,
  /^\/products$/,
  /^\/brands(\/\d+)?$/,
  /^\/events(\/\d+)$/,
  /^\/basket$/,
  /^\/contact$/,
  /^\/messages(\/\d+)$/,
  /^\/help-faq$/,
  /^\/inbox$/,
  /^\/login-security$/,
  /^\/my-addresses(\/edit\/\d+|\/add)?$/,
  /^\/my-events(\/\d+)$/,
  /^\/my-orders(\/\d+)$/,
  /^\/opportunities(\/\d+)$/,
  /^\/my-interests$/,
  /^\/products(\/\d+)$/,
  /^\/profile$/,
  /^\/my-vips$/,
  /^\/agent-profile-builder$/,
  /^\/vip-profile-builder$/,
  /^\/my-profile$/,
  /^\/edit-profile$/,
];

export const DEFAULT_LOGIN_REDIRECT = '/home';

export const apiAuthPrefix = '/api/auth';
