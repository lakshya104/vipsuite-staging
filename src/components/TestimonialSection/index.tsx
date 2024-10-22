import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import TestimonialCard from '../Testimonial/Testimonial';
import './TestimonialSection.scss';
import { ContentModule } from '@/interfaces/public-page';

interface TestimonialSectionProps {
  data: ContentModule;
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ data }) => {
  return (
    <Box component="section" className="testimonial-section">
      <Container>
        <Typography variant="h2">{data?.heading}</Typography>
        <Grid container spacing={2}>
          {data?.list_items?.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <TestimonialCard
                name={item?.author?.name}
                title={item.author?.job_title}
                testimonial={item?.testimonial_text}
                logo={item?.brand_logo?.url}
                authorPhoto={item?.author?.photo?.url}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TestimonialSection;
