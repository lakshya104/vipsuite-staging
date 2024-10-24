import React from 'react';
import { Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ProgressBarLink } from '../ProgressBar';
import Image from 'next/image';
import { formatDate } from '@/helpers/utils';
import he from 'he';
import './WishlistItemCard.scss';
import { DefaultImageFallback } from '@/helpers/enums';

interface WishlistItemCardProps {
  image: string;
  title: string;
  date?: string;
  location?: string;
  link: string;
  type: 'event' | 'brand-profile';
}

const WishlistItemCard: React.FC<WishlistItemCardProps> = ({ image, title, date, location, link, type }) => {
  const itemImage = image || DefaultImageFallback.placeholder;

  return (
    <Box className="wishlist-card__items">
      <ProgressBarLink href={link}>
        <Box className="wishlist-card__item" display={'flex'}>
          <Image src={itemImage} width={100} height={100} alt={title} style={{ width: '100%', height: '100%' }} />
          <Box>
            <Typography gutterBottom variant="h2">
              {he.decode(title)}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ textTransform: 'capitalize' }}>
              Type : {type}
            </Typography>
            {type === 'event' && (
              <>
                <Typography variant="body2" color="textSecondary">
                  Date : {formatDate(date)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Location : {location}
                </Typography>
              </>
            )}
          </Box>
          <ArrowForwardIcon />
        </Box>
      </ProgressBarLink>
    </Box>
  );
};

export default WishlistItemCard;
