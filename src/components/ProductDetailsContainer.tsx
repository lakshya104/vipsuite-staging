import React from 'react';
import Image from 'next/image';
import { Box, Container, Grid2, Typography } from '@mui/material';
import { find, get } from 'lodash';
import ItemRequestForm from '@/features/ItemRequestForm';
import { DefaultImageFallback } from '@/helpers/enums';
import { Product } from '@/interfaces/brand';
import ArrowBackBtn from './ArrowBackBtn';
import ReferCard from './ReferCard';
import RequestItemFormButton from './RequestItemFormButton';
import RedeemBox from './RedeemBox';
import HighEndItemMessage from './HighEndItemMessage';
import ShowHtml from './ShowHtml';

interface productsContainerProps {
  product: Product;
}

const productsContainer: React.FC<productsContainerProps> = ({ product }) => {
  const productImage = product?.images?.[0]?.src || DefaultImageFallback.Placeholder;
  const isRequestOnly = get(find(product?.meta_data, { key: 'is_request_only' }), 'value') === '1' || false;
  const showOffers =
    get(find(product?.meta_data, { key: 'show_offers' }), 'value') === '1' || product?.acf?.show_offers || false;
  const isLookbookAvailable = product?.acf?.is_lookbook_available;
  const lookBookHeading = product?.acf?.lookbook_heading;
  const lookBookDescription = product?.acf.lookbook_description;
  const lookbookPdf = product?.acf?.lookbook_pdf;
  const isHighEndItem = product?.is_high_end_item;

  return (
    <Box className="product-details__page">
      <Container>
        <Typography className="page-title" variant="h2" component="h1" gutterBottom>
          <ArrowBackBtn />
          {product?.name}
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Image src={productImage} alt={product?.name} height={500} width={500} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Typography variant="body1" gutterBottom>
              {product?.brand_name}
            </Typography>
            <Typography variant="h2" component="h2" gutterBottom>
              {product?.name}
            </Typography>
            {isHighEndItem && <HighEndItemMessage />}
            <ShowHtml text={product?.description} />
            <ItemRequestForm product={product} isRequestOnly={isRequestOnly} />
            {isLookbookAvailable && (
              <>
                <Box className="gray-card" display={'flex'} justifyContent={'space-between'} gap={2.5}>
                  <ReferCard heading={lookBookHeading} text={lookBookDescription} href={lookbookPdf} type="lookbook" />
                </Box>
                <RequestItemFormButton postId={product?.id} />
              </>
            )}
            {showOffers && <RedeemBox fetchOffers={showOffers} />}
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default productsContainer;
