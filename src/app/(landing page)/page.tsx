import React from 'react';
import { Box } from '@mui/material';
// import { eventCardData } from '@/data';
import HeroSection from '@/components/HeroSection/HeroSection';
// import EventCard from '@/components/EventsCards/EventsCards';
import Partner from '@/components/Partner/Partner';
// import Opportunity from '@/components/Opportunity/Opportunity';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import SocialAccordion from '@/components/SocialAccordion';
import JoinUs from '@/components/JoinUs';
import TestimonialSection from '@/components/TestimonialSection';

export async function generateMetadata(): Promise<Metadata> {
  try {
    return {
      metadataBase: new URL('https://vipsuite-staging.vercel.app'),
      title: 'Welcome to VIP Suite',
      description:
        'Discover a wide range of products, services, and exclusive deals on our platform. Start exploring today! Invite-only, private members portal for events, campaigns, gifting and more.',
      openGraph: {
        images: ['/img/maldives.png'],
      },
      twitter: {
        images: ['/img/maldives.png'],
      },
    };
  } catch (error) {
    return {
      metadataBase: new URL('https://vipsuite-staging.vercel.app'),
      title: 'Welcome to VIP Suite',
      description:
        'Discover a wide range of products, services, and exclusive deals on our platform. Start exploring today! Invite-only, private members portal for events, campaigns, gifting and more.',
    };
  }
}

export default async function Page() {
  const session = await auth();
  if (session) redirect('/home');

  return (
    <Box>
      <HeroSection />
      <Box component="section" className="site-card">
        {/* <Grid container spacing={2.5}>
              {eventCardData.map((event) => (
                <Grid key={event.id} item xs={12} md={6}>
                  <EventCard title={event.title} description={event.description} />
                </Grid>
              ))}
            </Grid> */}
        <SocialAccordion />
      </Box>
      <JoinUs />
      <Partner />
      <TestimonialSection />
      {/* <Opportunity /> */}
    </Box>
  );
}
