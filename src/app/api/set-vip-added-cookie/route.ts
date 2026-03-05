import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { CookieName } from '@/helpers/enums';
import { paths } from '@/helpers/paths';

export async function GET(request: NextRequest) {
  (await cookies()).set({
    name: CookieName.VipAdded,
    value: 'true',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    httpOnly: false,
    sameSite: 'none',
    secure: true,
  });
  const redirectUrl = paths.root.home.getHref();

  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
