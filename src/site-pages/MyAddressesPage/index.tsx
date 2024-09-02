import React, { Fragment } from 'react';
import { Typography } from '@mui/material';
import { GetAddresses, GetLoginUserId, GetToken } from '@/libs/api-manager/manager';
import { Address } from '@/interfaces';
import { get } from 'lodash';
import ErrorToaster from '@/components/ErrorToaster';
import AddressListing from '@/components/AddressListing';

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
        <AddressListing addresses={addresses} token={token} vipId={vipId} />
      ) : (
        <Typography textAlign="center">No Address found</Typography>
      )}
    </Fragment>
  );
};

export default MyAddressesPage;
