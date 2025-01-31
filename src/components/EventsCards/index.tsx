import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Image from 'next/image';
import './EventsCards.scss';
import { ProgressBarLink } from '../ProgressBar';
import en from '@/helpers/lang';

interface EventCardProps {
  title: string;
  description: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, description }) => {
  return (
    <Card className="site-card__item">
      <Box className="site-card__image">
        <Image src="/img/card.jpg" alt={title} height={672} width={1256} priority />
      </Box>
      <CardContent className="site-card__content">
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography variant="body1">{description}</Typography>
        <ProgressBarLink href="" className="button button--border">
          {en.landingPage.findOutMore}
        </ProgressBarLink>
      </CardContent>
    </Card>
  );
};

export default EventCard;
