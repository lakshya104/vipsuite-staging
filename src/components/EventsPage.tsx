'use client';
import React, { useState, useCallback, useEffect, useTransition } from 'react';
import SearchBar from './SearchBar';
import { Box, Grid, Typography } from '@mui/material';
import en from '@/helpers/lang';
import EventsListing from './EventListing';
import { isEmpty } from 'lodash';
import { Event } from '@/interfaces/events';
import ErrorFallback from './ErrorFallback';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';

interface EventCardsProps {
  eventsData: Event[];
  totalPages: number;
  currentPage: number;
}

const EventCards: React.FC<EventCardsProps> = ({ eventsData, currentPage, totalPages }) => {
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
      router.push(`?${params.toString()}`);
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
            <Grid container mb={2.5}>
              <Grid item xs={12}>
                <Box width="100%">
                  <Typography variant="h3" component="h2" mb={1}>
                    {eventsData.length} {en.events.results} &quot;{debouncedSearchQuery}&quot;
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}
          <EventsListing events={eventsData} totalPages={totalPages} currentPage={currentPage} />
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
