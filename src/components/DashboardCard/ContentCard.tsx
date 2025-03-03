import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { DefaultImageFallback } from '@/helpers/enums';
import './Dashboard.scss';
import { ContentCard } from '@/interfaces';
import Link from 'next/link';
import { paths } from '@/helpers/paths';

interface ContentCardBoxProps {
  data: ContentCard;
}

const ContentCardBox: React.FC<ContentCardBoxProps> = ({ data }) => {
  const { title, description, image, linked_opportunity } = data;

  let postTypePath;
  switch (linked_opportunity.post_type) {
    case 'opportunity':
      postTypePath = paths.root.opportunityDetails.getHref(linked_opportunity.ID);
      break;
    case 'event':
      postTypePath = paths.root.eventDetails.getHref(linked_opportunity.ID);
      break;
    // case 'product':
    //   postTypePath = paths.root.productDetails.getHref(linked_opportunity.ID);
    //   break;
    default:
      postTypePath = '/';
      break;
  }

  return (
    <Link href={postTypePath}>
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
        <Box className="dashboard-card__item-featured dashboard-card--landing-page">
          <Typography variant="h2">{title}</Typography>
          <Typography variant="body2">{description} </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default ContentCardBox;
