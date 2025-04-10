'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useTiktokInfo } from '@/store/useStore';

export default function CallbackPage() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const { setTiktokInfo, clearAll } = useTiktokInfo();

  useEffect(() => {
    clearAll();
    const fetchAccessToken = async (code: string) => {
      try {
        const response = await fetch('/api/tiktok/access-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });
        const data = await response.json();
        setTiktokInfo({
          code: data?.accessToken,
          followers: data?.data?.user?.follower_count,
          picture: data?.data?.user?.avatar_url,
          username: data?.data?.user?.display_name,
          expires: data?.expiresIn,
          refreshCode: data?.refreshToken,
        });
        setIsSuccess(true);
        window.close();
      } catch (error) {
        console.error('Failed to fetch access token:', error);
      }
    };

    const code = searchParams.get('code');
    if (code) {
      fetchAccessToken(code);
    } else {
      console.error('Authorization code not found.');
      window.close();
    }
  }, [searchParams, setTiktokInfo, clearAll]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        flexDirection: 'column',
        padding: '10px',
      }}
    >
      <svg width="100" height="100" viewBox="0 0 24 24" style={{ marginBottom: '20px' }}>
        <path
          fill="currentColor"
          d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"
        />
      </svg>
      <CircularProgress sx={{ marginBottom: '20px' }} />
      {isSuccess ? (
        <Typography>
          Authentication successful. Please close this window if not automatically closed and return to the app.
        </Typography>
      ) : (
        <Typography>Processing TikTok authentication...</Typography>
      )}
    </Box>
  );
}
