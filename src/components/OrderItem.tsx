import { LineItem } from '@/interfaces';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface OrderItemProps {
  item: LineItem;
}
const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <Box className="order-product__item" key={item?.id} display={'flex'}>
      <Image
        height={110}
        width={110}
        style={{ width: '100%', height: '100%' }}
        src={item?.image?.src || '/img/placeholder-image.jpg'}
        alt={item?.name || 'product-image'}
      />
      <Box>
        <Typography gutterBottom variant="h2">
          {item?.name}
        </Typography>
        {item?.variation_id !== 0 &&
          item?.meta_data?.map((attr, index) => (
            <Typography variant="body1" key={attr.id || index}>
              {attr?.display_key}: {attr?.display_value}
            </Typography>
          ))}
      </Box>
    </Box>
  );
};

export default OrderItem;
