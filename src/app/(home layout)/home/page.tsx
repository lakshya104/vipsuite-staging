import FeedItemCard from '@/components/FeedItemCard';
import ReferCard from '@/components/ReferCard';
import SearchEvent from '@/components/SearchEvent';
import SearchFilterTabs from '@/components/SearchFilterTabs';
import { feedItems } from '@/data';
import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import './Home.scss';


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
    <Box component={'main'} className='landing-page'>
      <Container>
        <SearchEvent searchParams={searchQuery && searchQuery} />
        {searchQuery ? (
          <>
            <Grid container mb={2.5}>
              <Grid item xs={12}>
                <Box width="100%">
                  <Typography variant='h3' component='h2' mb={1}>
                    {filterFeedItems.length} Results for {searchQuery}
                  </Typography>
                </Box>
                <SearchFilterTabs searchQuery={searchQuery} />
              </Grid>
            </Grid>
            <Grid className='landing-product' container spacing={2.5}>
              {filterFeedItems.length < 1 ? (
                <Typography variant='h2'>No results found</Typography>
              ) : (
                filterFeedItems.map((item, index) => (
                  <Grid item xs={12} sm={6} lg={4} key={index}>
                    <Box>
                      <FeedItemCard item={item} />
                    </Box>
                  </Grid>
                ))
              )}
            </Grid>
          </>
        ) : (
          <>
            <Box
              className="gray-card"
              display={'flex'}
              justifyContent={'space-between'}
              gap={2.5}
            >
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
            <Grid className='landing-product' container spacing={2.5}>
              {feedItems.map((item, index) => (
                <Grid item xs={12} sm={6} lg={4} key={index} className='landing-product__item'>
                  <FeedItemCard item={item} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
}
