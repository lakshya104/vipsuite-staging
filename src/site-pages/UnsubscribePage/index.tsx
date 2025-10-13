'use client';
import React, { useState } from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorIcon from '@mui/icons-material/Error';
import Image from 'next/image';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';
import ContentDisplay, { ContentConfig } from '@/components/UnsubscribeContentDisplay';
import en from '@/helpers/lang';
import { unsubscribeMe } from '@/libs/api-manager/manager';

interface UnsubscribePageProps {
  token?: string;
  user_id?: string;
}

export type UnsubscribeState = 'idle' | 'loading' | 'success' | 'error' | 'invalid';

const UnsubscribePage: React.FC<UnsubscribePageProps> = ({ token, user_id }) => {
  const [state, setState] = useState<UnsubscribeState>(token && user_id ? 'idle' : 'invalid');
  const [toasterType, setToasterType] = useState<'error' | 'success' | 'warning' | 'info'>('success');
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();

  const handleUnsubscribe = async () => {
    if (!token || !user_id) {
      setState('invalid');
      return;
    }
    setState('loading');
    try {
      const result = await unsubscribeMe(token, user_id);
      setState('success');
      setToasterType('success');
      openToaster(result.message || 'You have been successfully unsubscribed.');
    } catch (error) {
      console.error('Unsubscribe error:', error);
      setState('error');
      setToasterType('error');
      const errorMessage =
        typeof error === 'string'
          ? error
          : error instanceof Error && error.message
            ? error.message
            : 'Failed to unsubscribe. Please try again later.';
      openToaster(errorMessage);
    }
  };
  const ICON_CONFIGS = {
    idle: (
      <Button
        variant="contained"
        onClick={handleUnsubscribe}
        sx={{
          mt: 3,
          mx: 'auto',
          px: 4,
          py: 1.5,
          bgcolor: '#1a1a1a',
          color: 'white',
          textTransform: 'none',
          fontSize: '16px',
          fontWeight: 500,
          '&:hover': {
            bgcolor: '#333',
          },
        }}
      >
        Unsubscribe me
      </Button>
    ),
    loading: <CircularProgress size={64} sx={{ color: '#1a1a1a', mb: 3 }} />,
    success: <CheckCircleIcon sx={{ fontSize: '64px', color: '#4caf50', mb: 3 }} />,
    error: <CancelIcon sx={{ fontSize: '64px', color: '#f44336', mb: 3 }} />,
    invalid: <ErrorIcon sx={{ fontSize: '64px', color: '#f44336', mb: 3 }} />,
  };
  const currentConfig: ContentConfig = {
    icon: ICON_CONFIGS[state],
    title: en.unsubscribe[state].title,
    descriptions: en.unsubscribe[state].descriptions,
    state,
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: ' #fffff7' }}>
      <Box
        component="header"
        sx={{
          p: '24px 48px',
          bgcolor: '#fffff7',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Image src="/vipsblack.png" alt="The VIP Suite" height={13} width={114} priority />
      </Box>
      <Box
        component="main"
        sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: '40px 20px' }}
      >
        <Box
          sx={{
            maxWidth: 600,
            minHeight: 300,
            width: '100%',
            bgcolor: '#ffffff',
            borderRadius: 3,
            p: 6,
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
            textAlign: 'center',
          }}
        >
          <ContentDisplay {...currentConfig} />
        </Box>
      </Box>
      <Box component="footer" sx={{ p: 3, textAlign: 'center', borderTop: '1px solid #e0e0e0', bgcolor: '#fffff7' }}>
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} The VIP Suite. All rights reserved.
        </Typography>
      </Box>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity={toasterType} />
    </Box>
  );
};

export default UnsubscribePage;
