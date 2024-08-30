import React from 'react';
import { Box, Checkbox, Container, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ConfirmOrderBtn from '@/components/ConfirmOrderBtn';
import './address.scss';
import { GetAddresses, GetLoginUserId } from '@/libs/api-manager/manager';
import { Address } from '@/interfaces';
import { get } from 'lodash';
import ErrorToaster from '@/components/ErrorToaster';
import { ProgressBarLink } from '@/components/ProgressBar';

const AddressPage = async () => {
  let addresses: Address[] = [];
  const userId = await GetLoginUserId();

  try {
    addresses = await GetAddresses(userId);
  } catch (error) {
    const message = get(error, 'message', '');
    if ((message as string) === 'Expired token') {
      return <ErrorToaster message="Please login again to continue" login={true} errorMessage={String(error)} />;
    } else {
      return <ErrorToaster message="Address not found" errorMessage={String(error)} />;
    }
  }
  return (
    <Box className="address-page">
      <Container>
        <Box className="address-page__head">
          <Typography className="page-title" variant="h2" align="center" component="h1">
            Select Address
          </Typography>
          <ProgressBarLink className="button button--black" href="/addresses/add">
            Add <AddIcon />
          </ProgressBarLink>
        </Box>
        {addresses.length > 0 ? (
          addresses.map((add, index) => (
            <Box className="address__list" key={index}>
              <Box className="address__list-info">
                <Typography gutterBottom variant="h3" component="h2">
                  {add.first_name} {add.last_name}
                </Typography>
                <Typography variant="body2">{`${add.address_line_1}, ${add.address_line_2}, ${add.city}, ${add.state}, ${add.country}, ${add.postcode}`}</Typography>
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

export default AddressPage;
