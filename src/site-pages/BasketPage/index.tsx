import React from 'react';
import BasketCard from '@/components/BasketCard';
import { GetToken, GetVipCart } from '@/libs/api-manager/manager';
import { Cart } from '@/interfaces';
import ErrorToaster from '@/components/ErrorToaster';
import { get } from 'lodash';
import { Container, Typography } from '@mui/material';

const BasketPage = async () => {
  let cartData: Cart | null = null;
  let token = null;
  try {
    cartData = await GetVipCart();
    token = await GetToken();
  } catch (error) {
    const message = get(error, 'message', '');
    if ((message as string) === 'Expired token') {
      return <ErrorToaster message="Please login again to continue" login={true} errorMessage={String(error)} />;
    } else {
      return <ErrorToaster message="Basket items are currently not available" errorMessage={String(error)} />;
    }
  }
  if (!cartData) {
    return (
      <Container>
        <Typography align="center" variant="h4" marginTop={5}>
          Basket items are currently not available
        </Typography>
      </Container>
    );
  }
  return <BasketCard cartData={cartData} token={token} />;
};

export default BasketPage;
