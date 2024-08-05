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
      sx={{
        position: 'relative',
        maxWidth: '350px',
        mb: 3,
        height: '440px',
        backgroundImage: `url(${item.imagePath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <FeedLikeIcon />
      <CardContent
        sx={{
          position: 'absolute',
          color: '#fff',
          bottom: 0,
          left: 0,
        }}
      >
        {item.byRequest && (
          <Chip
            label="BY REQUEST ONLY"
            sx={{ bgcolor: 'white', fontWeight: '600', fontSize: '8px', borderRadius: '3px', mb: 1 }}
          />
        )}
        <Typography
          variant="h5"
          sx={{ fontSize: '20px', lineHeight: '24px', fontWeight: '600', color: '#FFFFF7' }}
          component="div"
        >
          {item.heading}
        </Typography>
        {item.description && (
          <Typography
            variant="body2"
            sx={{ fontSize: '12px', lineHeight: '24px', fontWeight: '400', color: '#FFFFF7' }}
          >
            {item.description}
          </Typography>
        )}
        <Typography
          variant="body2"
          sx={{ mt: 1, fontSize: '12px', lineHeight: '24px', fontWeight: '400', color: '#FFFFF7' }}
        >
          {item.type.join(' | ')}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeedItemCard;
