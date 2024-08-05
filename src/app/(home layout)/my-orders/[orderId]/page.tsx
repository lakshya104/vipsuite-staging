import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';
import OrderFeedbackForm from '@/features/OrderFeedbackForm';

export default function OrderPage({ params }: { params: { orderId: number } }) {
  const orderId = params['orderId'];
  return (
    <Box sx={{ p: 2, mb: 8 }}>
      <Box
        sx={{ display: 'flex', alignItems: 'center', py: 2, borderBottom: '1px solid #EBEBE3', position: 'relative' }}
      >
        <Link href={'/my-orders'} style={{ position: 'absolute' }}>
          <ArrowBackIcon />
        </Link>
        <Typography fontWeight="500" sx={{ flexGrow: 1, textAlign: 'center', fontSize: { xs: '14px', md: '22px' } }}>
          Order #{orderId}
        </Typography>
      </Box>

      <Box sx={{ py: 2, borderBottom: '1px solid #EBEBE3' }}>
        <Typography sx={{ fontSize: { xs: '12px', md: '16px' }, fontWeight: '400', color: '#494947' }} color="#494947">
          Order Date: 20/05/2024
        </Typography>
        <Typography sx={{ fontSize: { xs: '12px', md: '16px' }, fontWeight: '400', color: '#494947' }} color="#494947">
          Status: Processing
        </Typography>
      </Box>
      <Box>
        {Array.from({ length: 3 }).map((_, index) => (
          <Box
            key={index}
            sx={{ display: 'flex', alignItems: 'center', mb: 2, borderBottom: '1px solid #EBEBE3', p: 1 }}
          >
            <Box sx={{ width: { xs: '50px', md: '100px' }, height: { xs: '50px', md: '100px' }, mr: 2 }}>
              <Image
                width={100}
                height={100}
                style={{ width: '100%', height: '100%' }}
                src="/img/product_1.jpg"
                alt="product-image"
              />
            </Box>
            <Box>
              <Typography sx={{ fontSize: { xs: '13px', md: '18px' }, fontWeight: '500' }}>Boda Skins</Typography>
              <Typography sx={{ fontSize: { xs: '12px', md: '16px' }, fontWeight: '400', color: '#494947' }}>
                Item Name
              </Typography>
              <Typography sx={{ fontSize: { xs: '12px', md: '16px' }, fontWeight: '400', color: '#494947' }}>
                Size: 12
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <OrderFeedbackForm />
    </Box>
  );
}
