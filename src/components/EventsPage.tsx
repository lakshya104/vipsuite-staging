'use client';
import React, { useState, useCallback, useEffect, useTransition } from 'react';
import SearchBar from './SearchBar';
import { Box, Grid2, Typography } from '@mui/material';
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

  useEffect(() => {
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
      {!isEmpty(eventsData) ? (
        <>
          {debouncedSearchQuery && !isPending && (
            <Grid2 container mb={2.5}>
              <Grid2 size={{ xs: 12 }}>
                <Box width="100%">
                  <Typography variant="h3" component="h2" mb={1}>
                    {eventsData.length} {en.events.results} &quot;{debouncedSearchQuery}&quot;
                  </Typography>
                </Box>
              </Grid2>
            </Grid2>
          )}
          <EventsListing events={eventsData} />
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
