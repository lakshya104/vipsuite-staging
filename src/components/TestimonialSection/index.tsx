import { testimonials } from '@/data';
import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import TestimonialCard from '../Testimonial/Testimonial';
import './TestimonialSection.scss';

const TestimonialSection = () => {
  return (
    <Box component="section" className="testimonial-section">
      <Container>
        <Typography variant="h2">Testimonials</Typography>
        <Grid container spacing={2}>
          {testimonials.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <TestimonialCard name={item.name} title={item.title} testimonial={item.testimonial} logo={item.logo} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TestimonialSection;
