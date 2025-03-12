'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useInstaInfo } from '@/store/useStore';

export default function CallbackPage() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const { setInstaInfo, clearAll } = useInstaInfo();

  useEffect(() => {
    clearAll();
    const fetchAccessToken = async (code: string) => {
      try {
        const response = await fetch('/api/instagram/access-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });
        const data = await response.json();
        if (response.ok && data.access_token) {
          setInstaInfo({
            code: data.access_token,
            followers: data.followers_count,
            picture: data.profile_picture_url,
            username: data.username,
            expires: data.expires_in,
          });
          setIsSuccess(true);
          window.close();
        } else {
          console.error('Error fetching access token:', data.error);
        }
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
  }, [searchParams, clearAll, setInstaInfo]);

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
      <InstagramIcon sx={{ fontSize: 100, marginBottom: '20px' }} />
      <CircularProgress sx={{ marginBottom: '20px' }} />
      {isSuccess ? (
        <Typography>
          Authentication successful. Please close this window if not automatically closed and return to the app.
        </Typography>
      ) : (
        <Typography>Processing Instagram authentication...</Typography>
      )}
    </Box>
  );
}
