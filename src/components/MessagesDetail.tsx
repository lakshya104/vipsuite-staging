import { Box, Typography } from '@mui/material';
import React from 'react';
import InboxHeader from '@/components/InboxHeader';
import './InboxHeader/InboxHeader.scss';
export default async function MessagesDetail() {
  return (
    <Box className="order-details-page">
      <InboxHeader />
      <Box className="inbox_content">
        <Typography className="inbox__date">
          1hr ago <span></span> 03/10/2024
        </Typography>
        <Typography variant="h6"> Title of the message goes here</Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quaerat enim voluptatem porro, fugit
          facilis dolorem exercitationem voluptatibus ratione, delectus quasi necessitatibus accusantium, inventore
          asperiores. Vitae non odio dolor necessitatibus!{' '}
        </Typography>
        <Typography variant="body1">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat in, itaque vel optio nobis magnam nihil
          eveniet mollitia porro ipsa est dignissimos, officia minus totam recusandae maiores iure exercitationem
          dolores.
        </Typography>
      </Box>
    </Box>
  );
}
