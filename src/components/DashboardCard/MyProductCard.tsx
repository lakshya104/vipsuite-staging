import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { truncateDescription, wrapInParagraph } from '@/helpers/utils';
import { ProgressBarLink } from '../ProgressBar';
import { DefaultImageFallback } from '@/helpers/enums';
import './Dashboard.scss';
import { BrandProduct } from '@/interfaces/brand';
import { first, some } from 'lodash';

interface MyProductsCardProps {
  data: BrandProduct;
}

const MyProductsCard: React.FC<MyProductsCardProps> = ({ data }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { id, name, short_description, meta_data, images } = data;
  const image = first(images)?.src || DefaultImageFallback.Placeholder;
  const isRequestOnlyValue = some(meta_data, { key: 'is_request_only', value: '1' });
  const isFeatured = some(meta_data, { key: 'is_featured', value: '1' });

  return (
    <ProgressBarLink href={`products/${id}`}>
      <Box className="dashboard-card">
        <Image
          src={image || DefaultImageFallback.Placeholder}
          alt={`${name} image`}
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
        {/* {isEvent && brandLogo && (
          <Box className="dashboard-card__item-brandImage">
            <Image
              src={brandLogo}
              alt="brand logo"
              sizes="(max-width: 300px) 100vw, 300px"
              style={{ objectFit: 'contain' }}
              priority
              fill
              quality={75}
            />
          </Box>
        )} */}
        <Box className="dashboard-card__item-featured">
          {isRequestOnlyValue && (
            <Box className="dashboard-card__item-featuredBox">
              <Typography className="dashboard-card__item-featuredText" variant="overline">
                By Request Only
              </Typography>
            </Box>
          )}
          {isFeatured && (
            <Box className="dashboard-card__item-featuredBox dashboard-card__item-featuredProduct">
              <Typography className="dashboard-card__item-featuredText" variant="overline">
                Featured Product
              </Typography>
            </Box>
          )}
          {isClient && (
            <>
              <Typography variant="h2" dangerouslySetInnerHTML={{ __html: name || '' }} />
              <Typography
                variant="body2"
                dangerouslySetInnerHTML={{
                  __html: truncateDescription(wrapInParagraph(short_description), 30) || '',
                }}
              />
            </>
          )}
        </Box>
      </Box>
    </ProgressBarLink>
  );
};

export default MyProductsCard;
