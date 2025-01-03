import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { ProgressBarLink } from '../ProgressBar';
import { DefaultImageFallback } from '@/helpers/enums';
import './Dashboard.scss';
import { ContentCard } from '@/interfaces';
import { truncateDescription } from '@/helpers/utils';

interface ContentCardBoxProps {
  data: ContentCard;
}

const ContentCardBox: React.FC<ContentCardBoxProps> = ({ data }) => {
  const { title, description, image, url } = data;
  return (
    <ProgressBarLink href={url}>
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
          <Typography variant="body2">{truncateDescription(description, 30)} </Typography>
        </Box>
      </Box>
    </ProgressBarLink>
  );
};

export default ContentCardBox;
