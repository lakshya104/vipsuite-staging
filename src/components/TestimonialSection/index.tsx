import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import TestimonialCard from '../Testimonial/Testimonial';
import './TestimonialSection.scss';
import { PageData } from '@/interfaces/public-page';
import { find } from 'lodash';

interface TestimonialSectionProps {
  data: PageData;
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ data }) => {
  const contentModules = data.acf.content_modules;
  const filteredModule = find(contentModules, { acf_fc_layout: 'module_testimonials' });

  return (
    <Box component="section" className="testimonial-section">
      <Container>
        <Typography variant="h2">{filteredModule?.heading}</Typography>
        <Grid container spacing={2}>
          {filteredModule?.list_items?.map((item, index) => (
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
