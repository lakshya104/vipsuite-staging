import React from 'react';
import { CardContent, Typography, Avatar, Box } from '@mui/material';
import Image from 'next/image';
import './Testimonial.scss';

interface TestimonialCardProps {
  name: string;
  title: string;
  testimonial: string;
  logo: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, title, testimonial, logo }) => {
  return (
    <Box className="site-testimonial">
      <CardContent className="site-testimonial__inner">
        <Box mb={2} className="site-testimonial__logo">
          <Image src={logo} alt={`${name}'s Logo`} width={28} height={25} />
        </Box>
        <Typography variant="body1" mb={3}>
          {testimonial}
        </Typography>
        <Box className="site-testimonial__user">
          <Avatar alt={name} src={'/img/aiavatar.png'} />
          <Box className="site-testimonial__user-info">
            <Typography variant="h3" component="h3">
              {name}
            </Typography>
            <Typography variant="body2">{title}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Box>
  );
};

export default TestimonialCard;
