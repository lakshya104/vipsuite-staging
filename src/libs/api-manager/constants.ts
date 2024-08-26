const Endpoints = {
  login: '/wp/v2/login',
  signup: '/wp/v2/signup',
  getProfile: '/wp/v2/users/me',
  getBrands: '/wp/v2/brand-profiles',
  getBrandDetails: '/wp/v2/brand-profiles',
  getBrandProducts: '/wc/v3/products?brand',
  getBrandProductDetails: '/wc/v3/products',
  getSignupContent: '/wp/v2/signup-content',
  getVipEvents: '/wp/v2/events',
  getVipEventDetails: '/wp/v2/events',
  getProfileBuilderContent: '/wp/v2/profile-builder-content',
  updateProfile: '/wp/v2/vip-profile',
  forgotPassword: '/wp/v2/password-forgot',
  resetPassword: 'wp/v2/password-reset',
  getAllOrders: '/wc/v3/orders',
  getOrderById: '/wc/v3/orders',
};

export { Endpoints };
