'use client';
import React from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import ErrorToaster from '@/components/ErrorToaster';
import { Container, Skeleton, Typography } from '@mui/material';
import { ProgressBarLink } from '@/components/ProgressBar';
import './my-vips.scss';
import { paths } from '@/helpers/paths';
import en from '@/helpers/lang';

export default function Error() {
  return (
    <Box className="my-vips-page">
      <Container>
        <Box className="my-vips-page__head">
          <Skeleton className="page-title" variant="text" width="10%" height={45} />
          <Typography className="page-title" variant="h2" align="center">
            My VIPs
            <ProgressBarLink className="button button--black" href={paths.root.agentProfileBuilder.getHref()}>
              Add <AddIcon />
            </ProgressBarLink>
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" mb={5} minHeight="50vh">
          <ErrorToaster message={en.myVips.message} errorMessage={en.myVips.errorMessage} />
        </Box>
      </Container>
    </Box>
  );
}
