import { auth } from './auth';
import { DEFAULT_LOGIN_REDIRECT, publicRoutes, authRoutes, apiAuthPrefix, landingSlugPrefix } from '../routes';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isLandingSlugRoute = nextUrl.pathname.startsWith(landingSlugPrefix);

  if (isApiAuthRoute || isLandingSlugRoute) {
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
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/', nextUrl));
  }

  return;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
