import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../event.scss';
import FeedbackForm from '@/features/FeedbackForm';

export default function OrderPage() {
  return (
    <Box className="user-profile order-details-page">
      <Container>
        <Typography className="page-title" variant="h2" align="center">
          <Link href={'/my-orders'}>
            <ArrowBackIcon />
          </Link>
          Event Title
        </Typography>
        <Box mb={2.5}>
          <Typography variant="body1"> 20/05/2024</Typography>
          <Typography variant="body1">Time: 7 pm</Typography>
          <Typography variant="body1" gutterBottom>
            Location: Venue, Address 1, Address 2, Postcode
          </Typography>
          <Typography variant="body1" mt={2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lobortis cursus sem, in vestibulum
            odio molestie in. Curabitur interdum purus ac neque volutpat, in tempor ex blandit. Curabitur ac condimentum
            risus.
          </Typography>
        </Box>
        <FeedbackForm type="event" />
      </Container>
    </Box>
  );
}
