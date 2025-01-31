'use client';
import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import React, { useTransition } from 'react';
import { map } from 'lodash';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { ProgressBarLink } from './ProgressBar';
import DeleteAddressBtn from '@/components/DeleteAddressBtn';
import { Address } from '@/interfaces';
import en from '@/helpers/lang';

interface AddressListingProps {
  addresses: Address[];
}

const AddressListing: React.FC<AddressListingProps> = ({ addresses }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Box>
      {addresses.length > 0 ? (
        map(addresses, (add) => {
          return (
            <Box className="address__list" key={add.unique_id}>
              <Box className="address__list-info">
                <Typography gutterBottom variant="h3" component="h2">
                  {add?.first_name} {add?.last_name}
                </Typography>
                <Typography variant="body2">{`${add?.address_line_1}, ${add?.address_line_2}, ${add?.city}, ${add?.state},`}</Typography>
                <Typography variant="body2">{`${add?.country}, ${add?.postcode},`}</Typography>
                <Typography variant="body2">{`(${add?.phone})`}</Typography>
              </Box>
              <Box className="address__list-action">
                <ProgressBarLink href={`/my-addresses/edit/${add.unique_id}`}>
                  <EditOutlinedIcon />
                </ProgressBarLink>
                <DeleteAddressBtn addressId={add.unique_id} startTransition={startTransition} />
              </Box>
            </Box>
          );
        })
      ) : (
        <Typography textAlign="center">{en.address.noAddress}</Typography>
      )}
      <Backdrop sx={{ color: '#fff', zIndex: 100000 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default AddressListing;
