import React from 'react';
import { Typography, Grid, Box, Container } from '@mui/material';
import { testimonials } from '@/data';
import StyledCard from '../StyledCard/StyledCard';
import './Testimonial.scss';

const Testimonial = () => {
  return (
    <Box component="section" className="site-testimonial">
      <Container>
        <Typography component="h2" variant="h2">
          Testimonials
        </Typography>
        <Grid container alignItems="center" justifyContent="center" spacing={3}>
          {testimonials.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <StyledCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonial;
