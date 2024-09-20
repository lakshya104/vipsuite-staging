'use client';

import React, { useState, useMemo, useCallback } from 'react';
import SearchBar from './SearchBar';
import { Box, Container, Grid, Typography } from '@mui/material';
import EventsListing from './EventListing';
import { Event } from '@/interfaces/events';

interface EventCardsProps {
  eventsData: Event[];
  token: string;
  vipId: number;
}

const EventCards: React.FC<EventCardsProps> = ({ eventsData, token, vipId }) => {
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
        <EventsListing events={eventsData} vipId={vipId} token={token} />
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
          <EventsListing events={filteredEvents} vipId={vipId} token={token} />
        </>
      ) : (
        <Container>
          <Typography marginTop={5} variant="h2" textAlign="center">
            No results found
          </Typography>
        </Container>
      )}
    </>
  );
};

export default EventCards;
