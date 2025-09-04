import { auth } from './auth';
import { DEFAULT_LOGIN_REDIRECT, publicRoutes, authRoutes, apiAuthPrefix, protectedRoutes } from '../routes';
import { GrantAccessObj } from './helpers/enums';

export default auth((req) => {
  const { nextUrl } = req;
  const grantCookie = req.cookies.get(GrantAccessObj.Name);
  const isGrantCookie = grantCookie?.value === GrantAccessObj.Value;

  // if (process.env.NEXT_PUBLIC_NODE_ENV === 'production' && nextUrl.origin.includes('thevipsuite.co.uk')) {
  if (
    process.env.NEXT_PUBLIC_NODE_ENV !== 'production' &&
    nextUrl.origin.includes('vipsuite-dev') &&
    !isGrantCookie
  ) {
    if (nextUrl.pathname === '/') {
      return;
    }

    return Response.redirect(new URL('/', nextUrl));
  } else {
    const isLoggedIn = !!req.auth;

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isProtectedRoute = protectedRoutes.some((route) => route.test(nextUrl.pathname));
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

    if (isApiAuthRoute) {
      return;
    }

    if (isAuthRoute) {
      if (isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      return;
    }
    if (isLoggedIn && isPublicRoute) {
      return Response.redirect(new URL('/home', nextUrl));
    }
    if (!isLoggedIn && isProtectedRoute) {
      return Response.redirect(new URL('/login', nextUrl));
    }

    return;
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
