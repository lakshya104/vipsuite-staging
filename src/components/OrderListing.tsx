import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Order } from '@/interfaces';
import { ProgressBarLink } from './ProgressBar';
import { formatDate, formatString } from '@/helpers/utils';
import { isEmpty } from 'lodash';
import ErrorFallback from './ErrorFallback';
import CustomPagination from './CustomPagination';
import './CustomStepper/CustomStepper.scss';
import en from '@/helpers/lang';

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
            return (
              <ProgressBarLink href={`/my-orders/${order?.id}?page=${currentPage}`} key={order?.id}>
                <Box className="order-product__item" display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography gutterBottom variant="h2">
                      Order #{order?.id}
                    </Typography>
                    {order.status === 'rsvp-request' ? (
                      <Typography variant="body1">RSVP Date: {formatDate(order?.date_created)}</Typography>
                    ) : (
                      <>
                        <Typography variant="body1">{formatDate(order?.date_created)}</Typography>
                        <Typography variant="body1">Status: {formatString(order?.status)}</Typography>
                      </>
                    )}
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
