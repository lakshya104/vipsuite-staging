import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ProgressBarLink } from './ProgressBar';
import Image from 'next/image';
import { formatDate } from '@/helpers/utils';

interface WishlistItemCardProps {
  image: string;
  title: string;
  date?: string;
  location?: string;
  link: string;
  type: 'event' | 'brand-profile';
}

const WishlistItemCard: React.FC<WishlistItemCardProps> = ({ image, title, date, location, link, type }) => {
  const itemImage = image || '/img/placeholder-image.jpg';

  return (
    <ProgressBarLink href={link}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px',
          borderBottom: '1px solid #e0e0e0',
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src={itemImage}
            width={100}
            height={100}
            alt={title}
            style={{ width: 80, height: 80, marginRight: 2, borderRadius: '50px', margin: '0 20px 0 0' }}
          />
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
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
        </Box>
        <IconButton>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </ProgressBarLink>
  );
};

export default WishlistItemCard;
