import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    if (!code) {
      return NextResponse.json({ error: 'Authorization code is required' }, { status: 400 });
    }

    const tokenUrl = 'https://open.tiktokapis.com/v2/oauth/token/';

    const formData = new URLSearchParams();
    formData.append('client_key', process.env.NEXT_PUBLIC_TIKTOK_CLIENT_ID || '');
    formData.append('client_secret', process.env.TIKTOK_CLIENT_SECRET || '');
    formData.append('grant_type', 'authorization_code');
    formData.append('code', code);
    formData.append('redirect_uri', process.env.NEXT_PUBLIC_TIKTOK_CALLBACK_URL || '');

    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return NextResponse.json({ error: tokenData }, { status: tokenResponse.status });
    }

    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token;
    const expiresIn = tokenData.expires_in;

    const profileInfoUrl = 'https://open.tiktokapis.com/v2/user/info/?fields=display_name,avatar_url,follower_count';
    const profileInfoResponse = await fetch(profileInfoUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    const profileInfoData = await profileInfoResponse.json();
    if (!profileInfoResponse.ok) {
      return NextResponse.json({ error: profileInfoData }, { status: profileInfoData.status });
    }
    const data = { refreshToken, expiresIn, accessToken, ...profileInfoData };
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error exchanging token:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
