import BrandHome from '@/components/BrandHome';
import { GetSession } from '@/libs/api-manager/manager';
import { Box, Container } from '@mui/material';
import React from 'react';

export default async function Page() {
  const session = await GetSession();
  return (
    <Box className="basket-page">
      <Container>
        <BrandHome firstName={session?.first_name} />
      </Container>
    </Box>
  );
}
