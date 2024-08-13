import React, { Suspense } from 'react';
import { Box, Container } from '@mui/material';
import './Event.scss';
import HomeSearchBar from '@/components/HomeSearchBar';
import BrandsListing from '@/components/BrandsListing';
import EventsListing from '@/components/EventListing';
import CustomLoader from '@/components/CustomLoader';

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchQuery = typeof searchParams.type === 'string' ? searchParams.type : 'events';
  const renderSection = () => {
    switch (searchQuery) {
      case 'events':
        return (
          <Suspense fallback={<CustomLoader />}>
            <EventsListing />
          </Suspense>
        );
      case 'brands':
        return (
          <Suspense fallback={<CustomLoader />}>
            <BrandsListing />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<CustomLoader />}>
            <EventsListing />
          </Suspense>
        );
    }
  };
  return (
    <Box component={'main'} className="landing-page">
      <Container>
        <HomeSearchBar type={searchQuery} />
        {renderSection()}
      </Container>
    </Box>
  );
}
