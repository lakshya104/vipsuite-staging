import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';
import he from 'he';
import { Order } from '@/interfaces';
import { ProgressBarLink } from './ProgressBar';
import { formatDate, formatString, truncateDescription } from '@/helpers/utils';
import { first, isEmpty } from 'lodash';
import ErrorFallback from './ErrorFallback';
import CustomPagination from './CustomPagination';
import './CustomStepper/CustomStepper.scss';
import en from '@/helpers/lang';
import { DefaultImageFallback } from '@/helpers/enums';

interface OrderListingProps {
  totalPages: number;
  currentPage: number;
  allOrders: Order[];
}

const OrderListing: React.FC<OrderListingProps> = ({ allOrders, totalPages, currentPage }) => {
  if (isEmpty(allOrders)) {
    return (
      <ErrorFallback
        errorMessage={en.listEmptyMessage.noOrderData}
        hideSubtext={true}
        subtext={en.listEmptyMessage.addItemMessage}
      />
    );
  }

  return (
    <Container>
      <Box className="order-product__items">
        {allOrders.map((order: Order) => {
          if (order.id) {
            const response = order?.meta_data.find((item) => item.key === 'response')?.value;
            const orderType =
              order.status === 'lookbook-order' ? 'lookbookOrder' : order.status === 'rsvp-request' ? 'rsvp' : 'order';
            const orderTitle =
              orderType === 'lookbookOrder'
                ? order.opportunity?.title
                : orderType === 'rsvp'
                  ? order.opportunity?.title
                  : (first(order.line_items)?.parent_name ?? first(order.line_items)?.name);

            const productImage =
              orderType === 'rsvp'
                ? order?.opportunity?.image?.sizes?.medium
                : orderType === 'order'
                  ? first(order?.line_items)?.image?.src
                  : orderType === 'lookbookOrder'
                    ? order?.opportunity?.image?.sizes?.medium
                    : DefaultImageFallback.Placeholder;
            return (
              <ProgressBarLink href={`/my-orders/${order?.id}?page=${currentPage}`} key={order?.id}>
                <Box className="order-product__item" display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <Image
                      src={productImage || DefaultImageFallback.Placeholder}
                      alt="photo"
                      height={110}
                      width={110}
                      onError={(e) => {
                        e.currentTarget.src = DefaultImageFallback.Placeholder;
                      }}
                    />
                    <Box sx={{ ml: { xs: 2, md: 3 } }}>
                      <Typography gutterBottom variant="h2">
                        {orderType === 'lookbookOrder'
                          ? truncateDescription(orderTitle, 4)
                          : he.decode(orderTitle || '')}
                      </Typography>
                      {orderType === 'rsvp' ? (
                        <>
                          <Typography variant="body1">{formatDate(order?.date_created)}</Typography>
                          <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                            {response}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Typography variant="body1">{formatDate(order?.date_created)}</Typography>
                          <Typography variant="body1">Status: {formatString(order?.status)}</Typography>
                        </>
                      )}
                    </Box>
                  </Box>
                  <ArrowForwardIcon />
                </Box>
              </ProgressBarLink>
            );
          }
        })}
      </Box>
      {totalPages > 1 && (
        <Box className="custom-stepper">
          <CustomPagination currentPage={currentPage} totalPages={totalPages} />
        </Box>
      )}
    </Container>
  );
};

export default OrderListing;
