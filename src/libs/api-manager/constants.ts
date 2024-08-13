const Endpoints = {
  login: '/wp/v2/login',
  signup: '/wp/v2/signup',
  getProfile: '/wp/v2/users/me',
  getBrands: '/wp/v2/brand-profiles?_fields=id,title,brand-category,acf',
  getBrandDetails: '/wp/v2/brand-profiles',
  getBrandProducts: '/wc/v3/products?brand',
  getBrandProductDetails: '/wc/v3/products',
  getSignupContent: '/wp/v2/signup-content',
  getVipEvents: '/wp/v2/events',
  getProfileBuilderContent: '/wp/v2/profile-builder-content',
  updateProfile: '/wp/v2/vip-profile',
};

export { Endpoints };
