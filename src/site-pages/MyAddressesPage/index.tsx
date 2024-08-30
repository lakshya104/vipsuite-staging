import React, { Fragment } from 'react';
import { Box, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { GetAddresses, GetLoginUserId } from '@/libs/api-manager/manager';
import { Address } from '@/interfaces';
import { get } from 'lodash';
import ErrorToaster from '@/components/ErrorToaster';
import { ProgressBarLink } from '@/components/ProgressBar';

const MyAddressesPage = async () => {
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
    <Fragment>
      {addresses.length > 0 ? (
        addresses.map((add, index) => (
          <Box className="address__list" key={index}>
            <Box className="address__list-info">
              <Typography gutterBottom variant="h3">
                {add.first_name} {add.last_name}
              </Typography>
              <Typography variant="body2">{`${add.address_line_1}, ${add.address_line_2}, ${add.city}, ${add.state}, ${add.country}, ${add.postcode}`}</Typography>
            </Box>
            <Box className="address__list-action">
              <ProgressBarLink href={`/my-addresses/edit/${index + 1}`}>
                <EditOutlinedIcon />
              </ProgressBarLink>
              <DeleteOutlinedIcon />
            </Box>
          </Box>
        ))
      ) : (
        <Typography textAlign="center">No results found</Typography>
      )}
    </Fragment>
  );
};

export default MyAddressesPage;
