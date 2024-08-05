import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { eventCardData } from '@/data';
import Header from '@/components/Header/Header';
import HeroSection from '@/components/HeroSection/HeroSection';
import EventCard from '@/components/EventsCards/EventsCards';
import Partner from '@/components/Partner/Partner';
import Opportunity from '@/components/Opportunity/Opportunity';
import Testimonial from '@/components/Testimonial/Testimonial';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  const isLoggedIn = session?.user ? true : false;

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Box>
        <HeroSection />
        <Box component="section" className="site-card">
          <Container>
            <Grid container spacing={3}>
              {eventCardData.map((event) => (
                <Grid key={event.id} item xs={12} md={6}>
                  <EventCard title={event.title} description={event.description} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        <Partner />
        <Testimonial />
        <Opportunity />
      </Box>
    </>
  );
}
