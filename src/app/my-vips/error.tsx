'use client';
import React from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import ErrorToaster from '@/components/ErrorToaster';
import Btn from '@/components/Button/CommonBtn';
import { Container, Typography } from '@mui/material';
import { ProgressBarLink } from '@/components/ProgressBar';
import './my-vips.scss';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorPageProps) {
  return (
    <Box className="my-vips-page">
      <Container>
        <Box className="my-vips-page__head">
          <Typography className="page-title" variant="h2" align="center">
            My VIPs
            <ProgressBarLink className="button button--black" href="/agent-profile-builder">
              Add <AddIcon />
            </ProgressBarLink>
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" mb={5} minHeight="50vh">
          <ErrorToaster
            message={'Not able to show VIPs currently.'}
            errorMessage={'Not able to show VIPs currently.'}
          />
          <Btn look="dark-filled" className="button" onClick={reset}>
            Try again
          </Btn>
        </Box>
      </Container>
    </Box>
  );
}
