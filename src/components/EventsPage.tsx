'use client';
import React, { useState, useCallback, useTransition } from 'react';
import SearchBar from './SearchBar';
import { Box, Grid2, Skeleton, Typography } from '@mui/material';
import useUpdateEffect from '@/hooks/useUpdateEffect';
import en from '@/helpers/lang';
import EventsListing from './EventListing';
import { isEmpty } from 'lodash';
import { Event } from '@/interfaces/events';
import ErrorFallback from './ErrorFallback';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';

interface EventCardsProps {
  eventsData: Event[];
}

const EventCards: React.FC<EventCardsProps> = ({ eventsData }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  useUpdateEffect(() => {
    startTransition(() => {
      const params = new URLSearchParams(window.location.search);
      if (debouncedSearchQuery) {
        params.set('search', debouncedSearchQuery);
      } else {
        params.delete('search');
      }
      router.push(`?${params.toString()}`, { scroll: false });
    });
  }, [debouncedSearchQuery, router]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setSearchQuery('');
  }, []);

  const uniqueEvents: Event[] = [];
  const mappedBrandIds = new Set();
  const countMap: Record<number, number> = {};

  eventsData.forEach((item) => {
    const brandId = item.acf.brand_id;
    if (brandId) {
      countMap[brandId] = (countMap[brandId] || 0) + 1;
    }
  });

  eventsData.forEach((item) => {
    const brandId = item.acf.brand_id;
    if (brandId) {
      item.isBrandCard = countMap[brandId] >= 2;
      if (!mappedBrandIds.has(brandId)) {
        mappedBrandIds.add(brandId);
        uniqueEvents.push(item);
      }
    } else {
      item.isBrandCard = false;
      uniqueEvents.push(item);
    }
  });

  return (
    <>
      <Box my={2.5}>
        <SearchBar
          searchTerm={searchQuery}
          placeholder={en.events.searchPlaceholder}
          handleChange={handleChange}
          handleClear={handleClear}
          aria-label={en.events.searchPlaceholder}
        />
      </Box>
      {!isEmpty(uniqueEvents) ? (
        <>
          {isPending && searchQuery ? (
            <Grid2 container spacing={2}>
              {[...Array(3)].map((_, index) => (
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Skeleton variant="rectangular" width="100%" height={450} />
                </Grid2>
              ))}
            </Grid2>
          ) : debouncedSearchQuery ? (
            <>
              <Grid2 container mb={2.5}>
                <Grid2 size={{ xs: 12 }}>
                  <Box width="100%">
                    <Typography variant="h3" component="h2" mb={1}>
                      {uniqueEvents.length} {en.events.results} &quot;{debouncedSearchQuery}&quot;
                    </Typography>
                  </Box>
                </Grid2>
              </Grid2>
              <EventsListing events={uniqueEvents} />
            </>
          ) : (
            <EventsListing events={uniqueEvents} />
          )}
        </>
      ) : (
        <ErrorFallback
          errorMessage={en.listEmptyMessage.noEventData}
          hideSubtext={true}
          subtext={en.listEmptyMessage.noData}
        />
      )}
    </>
  );
};

export default EventCards;
