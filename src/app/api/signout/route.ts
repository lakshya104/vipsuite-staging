import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { signOut } from '@/auth';
import { CookieName } from '@/helpers/enums';

async function handleSignout(request: NextRequest) {
  // 1. Sign out NextAuth session on the server side
  try {
    await signOut({ redirect: false });
  } catch (error) {
    console.error('Error signing out session:', error);
  }

  // 2. Explicitly clear all cookies via Next.js cookie store as a fallback
  const cookieStore = await cookies();
  const cookiesToClear = [
    'authjs.session-token',
    '__Secure-authjs.session-token',
    'next-auth.session-token',
    '__Secure-next-auth.session-token',
    'authjs.callback-url',
    '__Secure-authjs.callback-url',
    'next-auth.callback-url',
    '__Secure-next-auth.callback-url',
    'authjs.csrf-token',
    '__Secure-authjs.csrf-token',
    'next-auth.csrf-token',
    '__Secure-next-auth.csrf-token',
  ];

  const deleteCookie = (name: string) => {
    cookieStore.delete({ name, path: '/' });
    cookieStore.delete({ name, path: '/', secure: true, sameSite: 'none' });
    cookieStore.delete({ name, path: '/', secure: true, sameSite: 'lax' });
  };

  cookiesToClear.forEach(deleteCookie);
  Object.values(CookieName).forEach(deleteCookie);

  // 3. Create redirect response to /login
  const response = NextResponse.redirect(new URL('/login', request.url));

  // 4. Set the Clear-Site-Data header to clear cookies, storage, and cache
  response.headers.set('Clear-Site-Data', '"*"');

  return response;
}

export async function GET(request: NextRequest) {
  return handleSignout(request);
}

export async function POST(request: NextRequest) {
  return handleSignout(request);
}
