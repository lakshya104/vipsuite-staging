const Endpoints = {
  login: '/wp/v2/login',
  signup: '/wp/v2/signup',
  getProfile: '/wp/v2/users/me',
  getBrands: '/wp/v2/brand-profiles?_fields=id,title,brand-category,acf',
  getBrandDetails: '/wp/v2/brand-profiles',
  getBrandProducts: '/wc/v3/products?brand',
  getBrandProductDetails: '/wc/v3/products',
};

export { Endpoints };
