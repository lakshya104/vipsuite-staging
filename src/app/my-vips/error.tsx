'use client';
import React from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import ErrorToaster from '@/components/ErrorToaster';
import { Container, Typography } from '@mui/material';
import { ProgressBarLink } from '@/components/ProgressBar';
import './my-vips.scss';

export default function Error() {
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
        </Box>
      </Container>
    </Box>
  );
}
