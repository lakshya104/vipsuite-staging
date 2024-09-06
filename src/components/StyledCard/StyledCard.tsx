import { Card, CardContent, Typography, Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import './StyledCard.scss';

interface Item {
  name: string;
  logo: string;
  title: string;
  testimonial: string;
}

interface StyledCardProps {
  item: Item;
}

const StyledCard: React.FC<StyledCardProps> = ({ item }) => {
  return (
    <Card className="styled-card">
      <Box className="styled-card__image">
        <Image src={item.logo} alt={item.name} height={63} width={72} />
      </Box>
      <CardContent className="styled-card__content">
        <Typography variant="h3">{item.name}</Typography>
        <Typography variant="h4">{item.title}</Typography>
        <Typography variant="body1">{item.testimonial}</Typography>
      </CardContent>
    </Card>
  );
};

export default StyledCard;
