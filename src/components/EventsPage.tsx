'use client';
import React, { useState, useMemo, useCallback } from 'react';
import SearchBar from './SearchBar';
import { Box, Grid, Typography } from '@mui/material';
import EventsListing from './EventListing';
import { Event } from '@/interfaces/events';
import ErrorFallback from './ErrorFallback';
import en from '@/helpers/lang';
import { isEmpty } from 'lodash';

interface EventCardsProps {
  eventsData: Event[];
}

const EventCards: React.FC<EventCardsProps> = ({ eventsData }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return eventsData;
    const lowerCaseQuery = searchQuery.toLowerCase().trim();
    return eventsData.filter((event) => {
      const searchableFields = [event.title.rendered];
      return searchableFields.some((field) => field && field.toLowerCase().includes(lowerCaseQuery));
    });
  }, [eventsData, searchQuery]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setSearchQuery('');
  }, []);

  if (isEmpty(eventsData)) {
    return (
      <>
        <Box my={2.5}>
          <SearchBar
            searchTerm={searchQuery}
            placeholder="Search for events..."
            handleChange={handleChange}
            handleClear={handleClear}
            aria-label="Search events"
          />
        </Box>
        <ErrorFallback
          errorMessage={en.listEmptyMessage.noEventData}
          hideSubtext={true}
          subtext={en.listEmptyMessage.noData}
        />
      </>
    );
  }
  return (
    <>
      <Box my={2.5}>
        <SearchBar
          searchTerm={searchQuery}
          placeholder="Search for events..."
          handleChange={handleChange}
          handleClear={handleClear}
          aria-label="Search events"
        />
      </Box>
      {!searchQuery ? (
        <EventsListing events={eventsData} />
      ) : searchQuery && filteredEvents.length > 0 ? (
        <>
          <Grid container mb={2.5}>
            <Grid item xs={12}>
              <Box width="100%">
                <Typography variant="h3" component="h2" mb={1}>
                  {filteredEvents.length} Results for &quot;{searchQuery}&quot;
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <EventsListing events={filteredEvents} />
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
