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
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';

interface EventCardsProps {
  eventsData: Event[];
}

const EventCards: React.FC<EventCardsProps> = ({ eventsData }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSearchApplied = searchParams.get('search');
  const [searchQuery, setSearchQuery] = useState<string>(isSearchApplied ? isSearchApplied : '');
  const [isPending, startTransition] = useTransition();
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [isClearing, setIsClearing] = useState<boolean>(false);

  useUpdateEffect(() => {
    startTransition(() => {
      const params = new URLSearchParams(window.location.search);
      if (debouncedSearchQuery) {
        params.set('search', debouncedSearchQuery);
      } else {
        params.delete('search');
      }
      router.push(`?${params.toString()}`, { scroll: false });
      setIsClearing(false);
    });
  }, [debouncedSearchQuery, router]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setIsClearing(true);
  }, []);

  const handleClear = useCallback(() => {
    setSearchQuery('');
    setIsClearing(true);
  }, []);

  const renderLoading = () => {
    return (
      <Grid2 container spacing={2}>
        {[...Array(3)].map((_, index) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Skeleton variant="rectangular" width="100%" height={450} />
          </Grid2>
        ))}
      </Grid2>
    );
  };

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
      {isClearing ? (
        renderLoading()
      ) : !isEmpty(eventsData) ? (
        <>
          {isPending && searchQuery ? (
            renderLoading()
          ) : debouncedSearchQuery ? (
            <>
              <Grid2 container mb={2.5}>
                <Grid2 size={{ xs: 12 }}>
                  <Box width="100%">
                    <Typography variant="h3" component="h2" mb={1}>
                      {eventsData.length > 1
                        ? `${eventsData.length} ${en.events.results} "${debouncedSearchQuery}"`
                        : `${eventsData.length} ${en.events.singleResult} "${debouncedSearchQuery}"`}
                    </Typography>
                  </Box>
                </Grid2>
              </Grid2>
              <EventsListing events={eventsData} />
            </>
          ) : (
            <EventsListing events={eventsData} />
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
