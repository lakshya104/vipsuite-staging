import { auth as proxy } from './auth';
import { DEFAULT_LOGIN_REDIRECT, authRoutes, apiAuthPrefix, protectedRoutes } from '../routes';

export default proxy((req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;

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

  if (!isLoggedIn && isProtectedRoute) {
    return Response.redirect(new URL('/on-boarding', nextUrl));
  }

  return;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api(?!/signout)|trpc)(.*)'],
};
