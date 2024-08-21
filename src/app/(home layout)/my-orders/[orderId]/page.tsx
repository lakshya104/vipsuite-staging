import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';
import '../order.scss';
import FeedbackForm from '@/features/FeedbackForm';
import { GetOrderById } from '@/libs/api-manager/manager';
import { LineItem, Order } from '@/interfaces';
import { formatDate } from '@/helpers/utils';
import ErrorToaster from '@/components/ErrorToaster';
import { get } from 'lodash';

export default async function OrderPage({ params }: { params: { orderId: number } }) {
  const orderId = params['orderId'];
  let orderDetail: Order | null = null;
  try {
    orderDetail = await GetOrderById(orderId);
  } catch (error) {
    const message = get(error, 'message', '');
    if ((message as string) === 'Expired token') {
      return <ErrorToaster message="Please login again to continue" login={true} errorMessage={String(error)} />;
    } else {
      return <ErrorToaster message="Order not found!" errorMessage={String(error)} />;
    }
  }
  if (!orderDetail) {
    return (
      <Container>
        <Typography align="center" variant="h4" marginTop={5}>
          Order not found.
        </Typography>
      </Container>
    );
  }
  return (
    <Box className="user-profile order-details-page">
      <Container>
        <Typography className="page-title" variant="h2" align="center">
          <Link href={'/my-orders'} aria-label="Back to My Orders">
            <ArrowBackIcon />
          </Link>
          Order #{orderId}
        </Typography>
        <Box my={2.5}>
          <Typography variant="body1">Order Date: {formatDate(orderDetail?.date_created)}</Typography>
          <Typography variant="body1">Status: {orderDetail?.status}</Typography>
        </Box>
        <Box className="order-product__items">
          {orderDetail?.line_items.map((item) => <OrderItem key={item?.id} item={item} />)}
        </Box>
        <FeedbackForm type="order" />
      </Container>
    </Box>
  );
}

const OrderItem = ({ item }: { item: LineItem }) => {
  return (
    <Box className="order-product__item" key={item?.id} display={'flex'}>
      <Image
        height={110}
        width={110}
        style={{ width: '100%', height: '100%' }}
        src={item?.image?.src || '/img/product_1.jpg'}
        alt={item?.name || 'product-image'}
      />
      <Box>
        <Typography gutterBottom variant="h2">
          {item?.name}
        </Typography>
        <Typography variant="body1">Item Name</Typography>
        {item?.variation_id !== 0 && <Typography variant="body1">Size: {item?.meta_data[0]?.display_value}</Typography>}
      </Box>
    </Box>
  );
};
