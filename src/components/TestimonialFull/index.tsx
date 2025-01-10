import React from 'react';
import { CardContent, Typography, Avatar, Box } from '@mui/material';
import './Testimonial.scss';

interface TestimonialFullCardProps {
  name: string;
  title: string;
  testimonial: string;
  authorPhoto: string;
}
const TestimonialCardFull: React.FC<TestimonialFullCardProps> = ({ name, title, testimonial, authorPhoto }) => {
  return (
    <Box className="site-testimonial ">
      <CardContent className="site-testimonial__inner">
        <Typography className="site-testimonial__body" variant="body1" mb={3}>
          {testimonial}
        </Typography>
        <Box className="site-testimonial__user" display="flex" alignItems="center">
          <Avatar alt={name} src={authorPhoto} />
          <Box className="site-testimonial__user-info" ml={2}>
            <Typography variant="h6" component="h3">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {title}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Box>
  );
};

export default TestimonialCardFull;
