export const paths = {
  landing: {
    getHref: () => '/',
  },

  comingSoon: {
    getHref: () => '/comingsoon',
  },

  auth: {
    onBoarding: {
      getHref: () => `/on-boarding`,
    },
    login: {
      getHref: () => `/login`,
    },
    forgotPassword: {
      getHref: () => `/forgot-password`,
    },
    signup: {
      vip: {
        getHref: () => `/signup/vip`,
      },
      agent: {
        getHref: () => `/signup/agent`,
      },
      brand: {
        getHref: () => `/signup/brand`,
      },
    },
  },

  root: {
    home: {
      getHref: () => '/home',
    },
    events: {
      getHref: () => '/events',
    },
    eventDetails: {
      getHref: (id: number) => `/events/${id}`,
    },
    opportunities: {
      getHref: () => '/opportunities',
    },
    opportunityDetails: {
      getHref: (id: number) => `/opportunities/${id}`,
    },
    products: {
      getHref: () => '/products',
    },
    productDetails: {
      getHref: (oppId: number, id: number) => `/products/${id}?opportunity=${oppId}`,
    },
    brandDetails: {
      getHref: (id: number) => `/brand/${id}`,
    },
    profile: {
      getHref: () => '/profile',
    },
    inbox: {
      getHref: () => '/inbox',
    },
    basket: {
      getHref: () => '/basket',
    },
    orderDetails: {
      getHref: (id: number) => `/my-orders/${id}`,
    },
    messageDetails: {
      getHref: (id: number) => `/messages/${id}`,
    },
    addresses: {
      getHref: () => '/my-addresses',
    },
    addAddress: {
      getHref: () => '/my-addresses/add',
    },
    editAddress: {
      getHref: (id: string) => `/my-addresses/edit/${id}`,
    },
    agentProfileBuilder: {
      getHref: () => '/agent-profile-builder',
    },
    vipProfileBuilder: {
      getHref: () => '/vip-profile-builder',
    },
    editProfile: {
      getHref: () => '/edit-profile',
    },
    editBrandProfile: {
      getHref: () => '/edit-brand-profile',
    },
    myVips: {
      getHref: () => '/my-vips',
    },
    myProfile: {
      getHref: () => '/my-profile',
    },
    brandHome: {
      getHref: () => '/brand-home',
    },
    loginSecurity: {
      getHref: () => '/login-security',
    },
    contact: {
      getHref: () => '/contact',
    },
    helpFaq: {
      getHref: () => '/help-faq',
    },
  },
} as const;

export const withSearchParams = (getHrefFn: () => string, params: Record<string, string | number>) => {
  const stringParams = Object.fromEntries(Object.entries(params).map(([key, value]) => [key, value.toString()]));
  const searchParams = new URLSearchParams(stringParams).toString();
  return `${getHrefFn()}${searchParams ? `?${searchParams}` : ''}`;
};
