import FeedItemCard from '@/components/FeedItemCard';
import ReferCard from '@/components/ReferCard';
import SearchEvent from '@/components/SearchEvent';
import SearchFilterTabs from '@/components/SearchFilterTabs';
import { feedItems } from '@/data';
import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';

export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const searchQuery = typeof searchParams.name === 'string' ? searchParams.name : '';
  const searchFilter = typeof searchParams.filter === 'string' ? searchParams.filter : '';

  const filterFeedItems = feedItems.filter((item) => {
    const matchesQuery = searchQuery
      ? item.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.some((type) => type.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
    const matchesFilter = searchFilter ? item.time.includes(searchFilter) : true;
    return matchesQuery && matchesFilter;
  });

  return (
    <Container sx={{ pb: 7 }}>
      <SearchEvent searchParams={searchQuery && searchQuery} />
      {searchQuery ? (
        <Grid container spacing={2} justifyContent="center">
          <Box display="flex" justifyContent="center" width="100%" mb={2} flexDirection="column" alignItems="center">
            <Box width="100%" height="40px">
              <Typography sx={{ fontWeight: '600', ml: { xs: '30px', md: '50px' } }}>
                {filterFeedItems.length} Results for {searchQuery}
              </Typography>
            </Box>
            <SearchFilterTabs sx={{ width: 'fit-content' }} searchQuery={searchQuery} />
          </Box>
          <Grid container spacing={2} justifyContent="center">
            {filterFeedItems.length < 1 ? (
              <Typography sx={{ mt: 6, fontWeight: '700' }}>No results found</Typography>
            ) : (
              filterFeedItems.map((item, index) => (
                <Grid item xs={12} sm={6} lg={4} key={index}>
                  <Box width="full" marginX="20px">
                    <FeedItemCard item={item} />
                  </Box>
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', m: 3, gap: { xs: 1, md: 4 } }}>
            <ReferCard
              heading="Refer a VIP"
              text="Lorem ipsum dolor sit amet, sed in posse primis, ius te putant molestie sapientem."
              href="/"
            />
            <ReferCard
              heading="Make a Request"
              text="Lorem ipsum dolor sit amet, sed in posse primis, ius te putant molestie sapientem."
              href="/"
            />
          </Box>
          <Grid container spacing={2} justifyContent="center">
            {feedItems.map((item, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Box width="full" marginX="20px">
                  <FeedItemCard item={item} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}
