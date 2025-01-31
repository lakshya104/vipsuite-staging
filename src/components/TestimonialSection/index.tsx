import { Box, Container, Grid2, Typography } from '@mui/material';
import React from 'react';
import TestimonialCard from '../Testimonial';
import './TestimonialSection.scss';
import { ContentModule } from '@/interfaces/public-page';
import TestimonialSectionFull from '../TestimonialSectionFull';

interface TestimonialSectionProps {
  data: ContentModule;
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ data }) => {
  return data.full_width_layout ? (
    <TestimonialSectionFull data={data} />
  ) : (
    <Box component="section" className="testimonial-section">
      <Container>
        <Typography variant="h2">{data?.heading}</Typography>
        <Grid2 container spacing={2}>
          {data?.list_items?.map((item, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <TestimonialCard
                name={item?.author?.name}
                title={item.author?.job_title}
                testimonial={item?.testimonial_text}
                logo={item?.brand_logo?.url}
                authorPhoto={item?.author?.photo?.url}
              />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
};

export default TestimonialSection;
