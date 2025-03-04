import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { DefaultImageFallback } from '@/helpers/enums';
import { LineItem } from '@/interfaces';
import en from '@/helpers/lang';

interface OrderItemProps {
  item: LineItem;
  isRelatedOpportunity?: boolean;
  title?: string;
}
const OrderItem: React.FC<OrderItemProps> = ({ item, isRelatedOpportunity = false, title = '' }) => {
  return (
    <Box className="order-product__item" key={item?.id} display={'flex'}>
      <Image
        height={110}
        width={110}
        style={{ width: '100%', height: '100%' }}
        src={item?.image?.src || DefaultImageFallback.Placeholder}
        alt={item?.name || 'product-image'}
      />
      <Box>
        <Typography gutterBottom variant="h2">
          {item?.name}
        </Typography>
        <Typography gutterBottom variant="body1">
          {item?.brand_name}
        </Typography>
        {item?.variation_id !== 0 &&
          item?.meta_data?.map((attr, index) => (
            <Typography variant="body1" key={attr.id || index}>
              {attr?.display_key}: {attr?.display_value}
            </Typography>
          ))}
        {isRelatedOpportunity && (
          <Typography variant="body1">
            {en.common.relatedOpportunity}: {title}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default OrderItem;
