import React from 'react';
import Image from 'next/image';
import { Box, Container, Grid, Typography } from '@mui/material';
import { find, get } from 'lodash';
import ItemRequestForm from '@/features/ItemRequestForm';
import { DefaultImageFallback } from '@/helpers/enums';
import { wrapInParagraph } from '@/helpers/utils';
import { Product } from '@/interfaces/brand';
import ArrowBackBtn from './ArrowBackBtn';
import ReferCard from './ReferCard';
import RequestItemFormButton from './RequestItemFormButton';
import RedeemBox from './RedeemBox';
import HighEndItemMessage from './HighEndItemMessage';

interface productsContainerProps {
  product: Product;
}

const productsContainer: React.FC<productsContainerProps> = ({ product }) => {
  const productImage = get(product, 'images[0].src', DefaultImageFallback.Placeholder);
  const productDescription = wrapInParagraph(product?.description);
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
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Image src={productImage} alt={product?.name} height={500} width={500} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" gutterBottom>
              {product?.brand_name}
            </Typography>
            <Typography variant="h2" component="h2" gutterBottom>
              {product?.name}
            </Typography>
            {isHighEndItem && <HighEndItemMessage />}
            <Box
              sx={{
                iframe: {
                  width: '100%',
                  aspectRatio: '16/9',
                  border: 0,
                },
                video: {
                  maxWidth: '100%',
                  height: 'auto',
                },
                p: {
                  marginBottom: 2,
                },
                a: {
                  color: 'blue',
                  textDecoration: 'underline',
                },
              }}
              dangerouslySetInnerHTML={{ __html: productDescription || '' }}
            />
            <ItemRequestForm product={product} isRequestOnly={isRequestOnly} />
            {isLookbookAvailable && (
              <>
                <Box className="gray-card" display={'flex'} justifyContent={'space-between'} gap={2.5}>
                  <ReferCard heading={lookBookHeading} text={lookBookDescription} href={lookbookPdf} isPdf={true} />
                </Box>
                <RequestItemFormButton postId={product?.id} />
              </>
            )}
            {showOffers && <RedeemBox />}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default productsContainer;
