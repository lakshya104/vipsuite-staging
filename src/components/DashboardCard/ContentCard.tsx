import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { DefaultImageFallback } from '@/helpers/enums';
import './Dashboard.scss';
import { ContentCard } from '@/interfaces';

interface ContentCardBoxProps {
  data: ContentCard;
}

const ContentCardBox: React.FC<ContentCardBoxProps> = ({ data }) => {
  const { title, description, image, url } = data;
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <Box className="dashboard-card">
        <Image
          src={image?.url || DefaultImageFallback.Placeholder}
          alt={`${title} image`}
          width={600}
          height={400}
          quality={75}
          style={{ objectFit: 'cover', height: '450px' }}
          placeholder="blur"
          blurDataURL={DefaultImageFallback.Placeholder}
          onError={(e) => {
            e.currentTarget.src = DefaultImageFallback.Placeholder;
          }}
        />
        <Box className="dashboard-card__item-featured">
          <Typography variant="h2">{title}</Typography>
          <Typography variant="body2">{description} </Typography>
        </Box>
      </Box>
    </a>
  );
};

export default ContentCardBox;
