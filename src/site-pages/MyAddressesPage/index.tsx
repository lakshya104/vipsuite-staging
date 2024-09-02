import React, { Fragment } from 'react';
import { Box, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { GetAddresses, GetLoginUserId, GetToken } from '@/libs/api-manager/manager';
import { Address } from '@/interfaces';
import { get } from 'lodash';
import ErrorToaster from '@/components/ErrorToaster';
import { ProgressBarLink } from '@/components/ProgressBar';
import DeleteAddressBtn from './DeleteAddressBtn';

const MyAddressesPage = async () => {
  let addresses: Address[] = [];
  const [vipId, token] = await Promise.all([GetLoginUserId(), GetToken()]);
  try {
    addresses = await GetAddresses(vipId);
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
              <Typography gutterBottom  variant="h3" component="h2">
                {add.first_name} {add.last_name}
              </Typography>
              <Typography variant="body2">{`${add.address_line_1}, ${add.address_line_2}, ${add.city}, ${add.state}, ${add.country}, ${add.postcode} ${add.phone}`}</Typography>
            </Box>
            <Box className="address__list-action">
              <ProgressBarLink href={`/my-addresses/edit/${index + 1}`}>
                <EditOutlinedIcon />
              </ProgressBarLink>
              <DeleteAddressBtn token={token} vipId={vipId} addressId={index + 1} />
            </Box>
          </Box>
        ))
      ) : (
        <Typography textAlign="center">No Address found</Typography>
      )}
    </Fragment>
  );
};

export default MyAddressesPage;
