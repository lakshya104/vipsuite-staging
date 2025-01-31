import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { first, some } from 'lodash';
import { truncateDescription, wrapInParagraph } from '@/helpers/utils';
import { ProgressBarLink } from '../ProgressBar';
import { DefaultImageFallback, PostType } from '@/helpers/enums';
import './Dashboard.scss';
import { BrandProduct } from '@/interfaces/brand';
import en from '@/helpers/lang';
import { paths, withSearchParams } from '@/helpers/paths';

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
  const href = data?.isBrandCard
    ? withSearchParams(() => paths.root.brandDetails.getHref(data?.brand_id), {
        type: PostType.Product,
      })
    : paths.root.productyDetails.getHref(id);

  return (
    <ProgressBarLink href={href}>
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
        <Box className="dashboard-card__item-featured">
          {isRequestOnlyValue && (
            <Box className="dashboard-card__item-featuredBox">
              <Typography className="dashboard-card__item-featuredText" variant="overline">
                {en.products.requestOnly}
              </Typography>
            </Box>
          )}
          {isFeatured && (
            <Box className="dashboard-card__item-featuredBox dashboard-card__item-featuredProduct">
              <Typography className="dashboard-card__item-featuredText" variant="overline">
                {en.products.featured}
              </Typography>
            </Box>
          )}
          {isClient && (
            <>
              {name && <Typography variant="h2" dangerouslySetInnerHTML={{ __html: name || '' }} />}
              {short_description && (
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{
                    __html: truncateDescription(wrapInParagraph(short_description), 30) || '',
                  }}
                />
              )}
            </>
          )}
        </Box>
      </Box>
    </ProgressBarLink>
  );
};

export default MyProductsCard;
