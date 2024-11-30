export const publicRoutes = ['/'];

export const authRoutes = [
  '/login',
  '/forgot-password',
  '/reset-password',
  '/on-boarding',
  '/signup/vip',
  '/signup/agent',
  '/signup/brand',
];

export const protectedRoutes = [
  /^\/home$/,
  /^\/brands(\/\d+)?$/,
  /^\/events(\/\d+)$/,
  /^\/basket$/,
  /^\/contact$/,
  /^\/help-faq$/,
  /^\/inbox$/,
  /^\/login-security$/,
  /^\/make-request$/,
  /^\/my-addresses(\/edit\/\d+|\/add)?$/,
  /^\/my-events(\/\d+)$/,
  /^\/my-orders(\/\d+)$/,
  /^\/opportunities(\/\d+)$/,
  /^\/my-interests$/,
  /^\/products(\/\d+)$/,
  /^\/profile$/,
  /^\/refer-a-vip$/,
  /^\/my-vips$/,
  /^\/agent-profile-builder$/,
  /^\/vip-profile-builder$/,
  /^\/my-profile$/,
  /^\/edit-profile$/,
];

export const DEFAULT_LOGIN_REDIRECT = '/home';

export const apiAuthPrefix = '/api/auth';
