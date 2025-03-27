import { PostType } from '@/helpers/enums';

const Endpoints = {
  login: '/wp/v2/login',
  vipSignup: '/wp/v2/signup/vip',
  agentSignup: '/wp/v2/signup/agent',
  brandSignup: '/wp/v2/signup/brand',
  agentProfileUpdate: (agentId: number) => `/wp/v2/vip-profile/${agentId}`,
  getProfile: '/wp/v2/users/me',
  getBrands: '/wp/v2/brand-profiles',
  getDashboardContent: '/wp/v2/vip-profiles/dashboard-content',
  getDashboard: '/wp/v2/profiles/dashboard',
  getBrandDetails: (brandId: number, type?: PostType) => {
    if (type) {
      return `/wp/v2/brand-profiles/${brandId}?post_type=${type}`;
    } else {
      return `/wp/v2/brand-profiles/${brandId}`;
    }
  },
  getBrandProducts: (brandId: number) => `/wc/v3/products?brand_profile_id=${brandId}`,
  getBrandProductDetails: (oppId: number, productId: number) => `/wp/v2/opportunities/${oppId}/product/${productId}`,
  getProducts: `/wc/v3/products?page=1&per_page=99`,
  getSignupContent: '/wp/v2/signup-content',
  getVipEvents: (search?: string) => {
    if (search) {
      return `/wp/v2/events?search=${search}&per_page=99&_fields=id,title,acf`;
    } else {
      return `/wp/v2/events?page=1&per_page=99&_fields=id,title,acf`;
    }
  },
  getVipEventDetails: (id: number) => `/wp/v2/events/${id}`,
  getProfileBuilderContent: '/wp/v2/profile-builder-content',
  updateProfile: '/wp/v2/vip-profile',
  createProfile: '/wp/v2/vip-profile',
  forgotPassword: '/wp/v2/forgot-password',
  resetPassword: '/wp/v2/reset-password',
  getAllOrders: (customerId: number, page: number) => `/wc/v3/orders?customer=${customerId}&page=${page}`,
  getOrderById: (id: number) =>
    `/wc/v3/orders/${id}?_fields=meta_data,status,id,opportunity,line_items,date_created,location,is_feedback_provided`,
  getVipCart: '/wp/v2/vip-profiles/cart',
  addItemToCart: (id: number) => `/wp/v2/vip-profiles/cart/${id}`,
  removeVipCartItem: (id: number) => `/wp/v2/vip-profiles/cart/${id}`,
  removeAllCartItems: `/wc/store/v1/cart/items`,
  createOrder: `/wc/v3/orders`,
  getVipOpportunities: (oppId?: string, search?: string) => {
    if (oppId && search) {
      return `/wp/v2/opportunities?opportunity-category=${oppId}&per_page=99&page=1&search=${search}&_fields=id,title,opportunity-category,acf.is_featured,acf.featured_image.sizes.vs-container-half,acf.is_lookbook_available,acf.lookbook_description,acf.lookbook_heading,acf.lookbook_pdf,acf.brand_id`;
    } else if (oppId) {
      return `/wp/v2/opportunities?opportunity-category=${oppId}&per_page=99&_fields=id,title,opportunity-category,acf.is_featured,acf.featured_image.sizes.vs-container-half,acf.is_lookbook_available,acf.lookbook_description,acf.lookbook_heading,acf.lookbook_pdf,acf.brand_id`;
    } else if (search) {
      return `/wp/v2/opportunities?search=${search}&per_page=99&_fields=id,title,opportunity-category,acf.is_featured,acf.featured_image.sizes.vs-container-half,acf.is_lookbook_available,acf.lookbook_description,acf.lookbook_heading,acf.lookbook_pdf,acf.brand_id`;
    } else {
      return `/wp/v2/opportunities?page=1&per_page=99&_fields=id,title,opportunity-category,acf.is_featured,acf.featured_image.sizes.vs-container-half,acf.is_lookbook_available,acf.lookbook_description,acf.lookbook_heading,acf.lookbook_pdf,acf.brand_id`;
    }
  },
  sendRsvp: '/wp/v2/rsvp-request',
  logOut: '/wp/v2/logout',
  getVipRsvpEvents: `/wp/v2/vip-profiles/rsvp-events`,
  getAddresses: '/wp/v2/vip-profiles/addresses',
  deleteAddress: (addressId: string) => `/wp/v2/vip-profiles/addresses/${addressId}`,
  getVipOpportunityDetails: (id: number) => `/wp/v2/opportunities/${id}?_fields=id,title,acf`,
  orderFeedback: (orderNumber: number) => `/wp/v2/vip-profiles/orders/${orderNumber}/feedback`,
  eventFeedback: (eventId: number) => `/wp/v2/vip-profiles/events/${eventId}/feedback`,
  addToWishlist: (postId: number) => `/wp/v2/vip-profiles/wishlist/${postId}`,
  getPageContent: (slug: string) => `/wp/v2/pages/?slug=${slug}`,
  referVIP: '/wp/v2/profiles/refer-vip',
  makeRequest: '/wp/v2/profiles/make-request',
  vipSearch: (keyword: string) => `/wp/v2/vip-profiles/search?keyword=${keyword}`,
  getAllVip: `/wp/v2/agent/vip-profiles`,
  getMenuItems: `/wp/v2/nav-menu-items?menu_slug=primary-menu`,
  verifyEmail: '/wp/v2/email-verification-code',
  getOpportunityCategory: 'wp/v2/opportunity-category',
  getFormId: (tag: string) => `/wp/v2/website-content?_fields=${tag}`,
  submitLandingPageForm: (id: string) => `/contact-form-7/v1/contact-forms/${id}/feedback`,
  getOffers: `/wp/v2/offers`,
  getMessages: `/wp/v2/vip-profiles/orders/messages`,
  getMessageDetails: (id: number) => `/wp/v2/vip-profiles/orders/${id}/messages`,
  sendMessage: (id: number) => `/wp/v2/vip-profiles/orders/${id}/messages`,
  getWebsiteContent: `/wp/v2/website-content`,
  getComingSoonData: `/wp/v2/coming-soon-content`,
  resetPasswordWithLogin: '/wp/v2/user-password-reset',
};

export { Endpoints };
