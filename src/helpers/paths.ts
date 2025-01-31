export const paths = {
  landing: {
    getHref: () => '/',
  },

  auth: {
    onBoarding: {
      getHref: () => `/onBoarding`,
    },
    login: {
      getHref: () => `/login`,
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
    productyDetails: {
      getHref: (id: number) => `/products/${id}`,
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
  },
} as const;

export const withSearchParams = (getHrefFn: () => string, params: Record<string, string | number>) => {
  const stringParams = Object.fromEntries(Object.entries(params).map(([key, value]) => [key, value.toString()]));
  const searchParams = new URLSearchParams(stringParams).toString();
  return `${getHrefFn()}${searchParams ? `?${searchParams}` : ''}`;
};
