/* eslint-disable no-unused-vars */
export enum UserRole {
  Vip = 'vip',
  Agent = 'agent',
  Brand = 'brand',
}

export enum ProfileStatus {
  Approved = 'approved',
  Pending = 'pending',
  Rejected = 'rejected',
}

export enum DefaultImageFallback {
  PersonPlaceholder = '/img/personPlaceholder.png',
  Placeholder = '/img/placeholder.png',
}

export enum HomeModuleTypes {
  Intro = 'module_intro',
  Slider = 'module_slider',
  InfoList = 'module_info_list',
  InfoTable = 'module_info_table',
  Promo = 'module_promo',
  LogoList = 'module_logo_list',
  Testimonials = 'module_testimonials',
}

export enum CookieName {
  VipId = 'vipId',
  FollowerCount = 'followers',
}
