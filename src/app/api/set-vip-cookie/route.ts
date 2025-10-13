import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { CookieName } from '@/helpers/enums';
import { withSearchParams, paths } from '@/helpers/paths';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const vipId = searchParams.get('vipId');

  if (!vipId) {
    return NextResponse.json({ error: 'VIP ID is required' }, { status: 400 });
  }
  (await cookies()).set({
    name: CookieName.IncompleteVipId,
    value: vipId,
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    httpOnly: false,
    sameSite: 'none',
    secure: true,
  });
  const redirectUrl = withSearchParams(() => paths.root.agentProfileBuilder.getHref(), { editVip: 'true' });

  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
