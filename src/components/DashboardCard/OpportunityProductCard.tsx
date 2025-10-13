import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { truncateDescription, wrapInParagraph } from '@/helpers/utils';
import { ProgressBarLink } from '../ProgressBar';
import { DefaultImageFallback } from '@/helpers/enums';
import './Dashboard.scss';
import { paths } from '@/helpers/paths';
import en from '@/helpers/lang';

interface OpportunityProductCardProps {
  oppId: number;
  id: number;
  name: string;
  description: string;
  image: string;
  isRequestOnly: boolean;
}

const OpportunityProductCard: React.FC<OpportunityProductCardProps> = ({
  oppId,
  id,
  description,
  image,
  name,
  isRequestOnly,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const href = paths.root.productDetails.getHref(oppId, id);

  return (
    <>
      <Box className="dashboard-card">
        <Image
          src={image || DefaultImageFallback.Placeholder}
          alt={`${name} image`}
          width={600}
          height={400}
          quality={75}
          style={{ minHeight: '372px', height: 'auto' }}
          placeholder="blur"
          blurDataURL={DefaultImageFallback.Placeholder}
          onError={(e) => {
            e.currentTarget.src = DefaultImageFallback.Placeholder;
          }}
        />
      </Box>
      <Box className="dashboard-card__item-featured dashboard-card__content">
        {isRequestOnly && (
          <Box className="dashboard-card__item-featuredBox">
            <Typography className="dashboard-card__item-featuredText" variant="overline">
              {en.products.requestOnly}
            </Typography>
          </Box>
        )}
        {isClient && (
          <>
            {name && <Typography variant="h2" dangerouslySetInnerHTML={{ __html: name || '' }} />}
            {description && (
              <Box
                className="dashboard-card__description"
                dangerouslySetInnerHTML={{
                  __html: truncateDescription(wrapInParagraph(description), 30) || '',
                }}
              />
            )}
          </>
        )}
      </Box>
      <ProgressBarLink className="opportunity-product__link" href={href}>
        <Button variant="contained" className="button button--black">
          View Item
        </Button>
      </ProgressBarLink>
    </>
  );
};

export default OpportunityProductCard;
