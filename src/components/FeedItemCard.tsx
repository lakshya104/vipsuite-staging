import * as React from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';
import { FeedItem } from '@/data';
import FeedLikeIcon from './FeedLikeIcon';

interface FeedItemCardProps {
  item: FeedItem;
}

const FeedItemCard: React.FC<FeedItemCardProps> = ({ item }) => {
  return (
    <Card
      className="landing-product__item-inner"
      sx={{
        backgroundImage: `url(${item.imagePath})`,
      }}
    >
      <FeedLikeIcon />
      {item.byRequest && <Chip label="BY REQUEST ONLY" />}
      <CardContent className="landing-product__item-content">
        <Typography variant="h2">{item.heading}</Typography>
        {item.description && (
          <Typography variant="body2" mb={2}>
            {item.description}
          </Typography>
        )}
        <Typography variant="body2">{item.type.join(' <span>|</span> ')}</Typography>
      </CardContent>
    </Card>
  );
};

export default FeedItemCard;
