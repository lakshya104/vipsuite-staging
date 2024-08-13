import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';
import '../order.scss';
import FeedbackForm from '@/features/FeedbackForm';

export default function OrderPage({ params }: { params: { orderId: number } }) {
  const orderId = params['orderId'];
  return (
    <Box className="user-profile order-details-page">
      <Container>
        <Typography className="page-title" variant="h2" align="center">
          <Link href={'/my-orders'}>
            <ArrowBackIcon />
          </Link>
          Order #{orderId}
        </Typography>
        <Box mb={2.5}>
          <Typography variant="body1">Order Date: 20/05/2024</Typography>
          <Typography variant="body1">Status: Processing</Typography>
        </Box>
        <Box className="order-product__items">
          {Array.from({ length: 3 }).map((_, index) => (
            <Box className="order-product__item" key={index} display={'flex'}>
              <Image
                height={110}
                width={110}
                style={{ width: '100%', height: '100%' }}
                src="/img/product_1.jpg"
                alt="product-image"
              />
              <Box>
                <Typography gutterBottom variant="h2">
                  Boda Skins
                </Typography>
                <Typography variant="body1">Item Name</Typography>
                <Typography variant="body1">Size: 12</Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <FeedbackForm type="order" />
      </Container>
    </Box>
  );
}
