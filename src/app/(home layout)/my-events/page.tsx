import React, { FC } from 'react';
import { Typography, Container, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import './event.scss';

interface Order {
  id: string;
  date: string;
  time: string;
  location: string;
}

const orders: Order[] = [
  { id: '123456', date: '20/05/2024', time: '7 pm', location: 'Venue, Address 1, Address 2, Postcode' },
  { id: '123455', date: '19/05/2024', time: '8 pm', location: 'Venue, Address 1, Address 2, Postcode' },
  { id: '123454', date: '19/04/2024', time: '4 pm', location: 'Venue, Address 1, Address 2, Postcode' },
  { id: '123453', date: '13/04/2024', time: '9 pm', location: 'Venue, Address 1, Address 2, Postcode' },
  { id: '123452', date: '11/03/2024', time: '10 pm', location: 'Venue, Address 1, Address 2, Postcode' },
];

const MyOrders: FC = () => {
  return (
    <>
      <Box className="user-profile">
        <Container>
          <Typography className="page-title" variant="h2" align="center">
            My Events
          </Typography>

          <Box className="order-product__items">
            {orders.map((order: Order) => (
              <Box
                className="order-product__item"
                key={order.id}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box>
                  <Typography gutterBottom variant="h2">
                    Event Title
                  </Typography>
                  <Typography variant="body1">{order.date}</Typography>
                  <Typography variant="body1">Time: {order.time}</Typography>
                  <Typography variant="body1">Location: {order.location}</Typography>
                </Box>
                <Link href={`/my-events/${order.id}`}>
                  <ArrowForwardIcon />
                </Link>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MyOrders;
