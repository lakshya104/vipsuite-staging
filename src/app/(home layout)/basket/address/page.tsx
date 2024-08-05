import React from 'react';
import { Box, Checkbox, Container, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Btn from '@/components/Button/CommonBtn';
import ConfirmOrderBtn from '@/components/ConfirmOrderBtn';
import './address.scss';

const addresses = [
  {
    id: 1,
    name: 'First Lastname',
    address: '123 Road Name, City, County, AA11 1BC',
  },
  {
    id: 2,
    name: 'First Lastname',
    address: '123 Road Name, City, County, AA11 1BC',
  },
];

const Address = () => {
  return (
    <Box className="address-page">
      <Container>
        <Box className="address-page__head">
          <Typography className="page-title" variant="h2" align="center" component="h1">
            Select Address
          </Typography>
          <Btn look="dark-filled" fullWidth>
            Add <AddIcon />
          </Btn>
        </Box>
        {addresses.length > 0 ? (
          addresses.map((add) => (
            <Box className="address__list" key={add.id}>
              <Box className="address__list-info">
                <Typography gutterBottom variant="h2">
                  {add.name}
                </Typography>
                <Typography variant="body2">{add.address}</Typography>
              </Box>
              <Checkbox />
            </Box>
          ))
        ) : (
          <Typography textAlign="center">No results found</Typography>
        )}
        <ConfirmOrderBtn />
      </Container>
    </Box>
  );
};

export default Address;
