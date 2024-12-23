import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Order } from '@/interfaces';
import { ProgressBarLink } from './ProgressBar';
import { formatDate, formatString, truncateDescription } from '@/helpers/utils';
import { first, isEmpty } from 'lodash';
import ErrorFallback from './ErrorFallback';
import CustomPagination from './CustomPagination';
import './CustomStepper/CustomStepper.scss';
import en from '@/helpers/lang';
import Image from 'next/image';
import { DefaultImageFallback } from '@/helpers/enums';

interface OrderListingProps {
  totalPages: number;
  currentPage: number;
  allOrders: Order[];
}

const OrderListing: React.FC<OrderListingProps> = ({ allOrders, totalPages, currentPage }) => {
  if (!allOrders) {
    return <ErrorFallback errorMessage="No orders found" hideSubtext={true} />;
  }
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
              order.status === 'lookbook-order'
                ? 'lookbookOrder'
                : order.status === 'rsvp-request'
                  ? order.opportunity
                    ? 'opportunity'
                    : 'event'
                  : 'order';
            const orderTitle =
              orderType === 'lookbookOrder'
                ? order.meta_data.find((item: { key: string }) => item.key === 'lookbook_order_data')?.value
                : orderType === 'opportunity'
                  ? order.opportunity?.title
                  : orderType === 'event'
                    ? order.event?.title
                    : (first(order.line_items)?.parent_name ?? first(order.line_items)?.name);

            const productImage =
              orderType === 'opportunity'
                ? order.opportunity?.image?.url
                : orderType === 'event'
                  ? order.event?.image?.url
                  : orderType === 'order'
                    ? first(order.line_items)?.image.src
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
                    />
                    <Box sx={{ ml: { xs: 2, md: 3 } }}>
                      <Typography gutterBottom variant="h2">
                        {truncateDescription(orderTitle, 4)}
                      </Typography>
                      {orderType === 'event' || orderType === 'opportunity' ? (
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
