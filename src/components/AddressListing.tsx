'use client';
import { Box, Typography } from '@mui/material';
import React, { useTransition } from 'react';
import { map } from 'lodash';
import { ProgressBarLink } from './ProgressBar';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteAddressBtn from '@/components/DeleteAddressBtn';
import { Address } from '@/interfaces';
import MyAddressesPageLoading from '@/site-pages/MyAddressesPage/loading';
import { useUserInfoStore } from '@/store/useStore';

interface AddressListingProps {
  addresses: Address[];
  token: string;
  vipId: number;
}

const AddressListing: React.FC<AddressListingProps> = ({ addresses, token, vipId }) => {
  const [isPending, startTransition] = useTransition();
  const { userRoleStore } = useUserInfoStore();
  return (
    <Box>
      {addresses.length > 0 ? (
        isPending ? (
          <MyAddressesPageLoading />
        ) : (
          map(addresses, (add) => {
            const editLink =
              userRoleStore === 'vip'
                ? `/my-addresses/edit/${add.unique_id}`
                : `/agent-addresses/edit/${add.unique_id}`;
            return (
              <Box className="address__list" key={add.unique_id}>
                <Box className="address__list-info">
                  <Typography gutterBottom variant="h3" component="h2">
                    {add?.first_name} {add?.last_name}
                  </Typography>
                  <Typography variant="body2">{`${add?.address_line_1}, ${add?.address_line_2}, ${add?.city}, ${add?.state},`}</Typography>
                  <Typography variant="body2">{`${add?.country}, ${add?.postcode},`}</Typography>
                  <Typography variant="body2">{`${add?.company}, (${add?.phone})`}</Typography>
                </Box>
                <Box className="address__list-action">
                  <ProgressBarLink href={editLink}>
                    <EditOutlinedIcon />
                  </ProgressBarLink>
                  <DeleteAddressBtn
                    token={token}
                    vipId={vipId}
                    addressId={add.unique_id}
                    startTransition={startTransition}
                  />
                </Box>
              </Box>
            );
          })
        )
      ) : (
        <Typography textAlign="center">No Address found</Typography>
      )}
    </Box>
  );
};

export default AddressListing;
