import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    if (!code) {
      return NextResponse.json({ error: 'Authorization code is required' }, { status: 400 });
    }

    const tokenUrl = 'https://api.instagram.com/oauth/access_token';

    const formData = new URLSearchParams();
    formData.append('client_id', process.env.INSTAGRAM_CLIENT_ID || '');
    formData.append('client_secret', process.env.INSTAGRAM_CLIENT_SECRET || '');
    formData.append('grant_type', 'authorization_code');
    formData.append('code', code);
    formData.append('redirect_uri', process.env.INSTAGRAM_REDIRECT_URI || '');

    const shortTokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    });

    const shortTokenData = await shortTokenResponse.json();

    if (!shortTokenResponse.ok) {
      return NextResponse.json({ error: shortTokenData }, { status: shortTokenResponse.status });
    }

    const shortLivedToken = shortTokenData.access_token;
    const longTokenUrl = `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET || ''}&access_token=${shortLivedToken}`;

    const longTokenResponse = await fetch(longTokenUrl, { method: 'GET' });
    const longTokenData = await longTokenResponse.json();
    if (!longTokenResponse.ok) {
      return NextResponse.json({ error: longTokenData }, { status: longTokenResponse.status });
    }
    const profileInfoUrl = `https://graph.instagram.com/me?fields=id,username,account_type,media_count,profile_picture_url,followers_count&access_token=${longTokenData.access_token}`;
    const profileInfoResponse = await fetch(profileInfoUrl, { method: 'GET' });
    const profileInfoData = await profileInfoResponse.json();
    if (!profileInfoResponse.ok) {
      return NextResponse.json({ error: profileInfoData }, { status: profileInfoData.status });
    }
    const data = { ...longTokenData, ...profileInfoData };
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error exchanging token:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
